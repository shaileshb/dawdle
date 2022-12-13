from absl import app
from absl import flags
from PIL import Image as Im
from sklearn.cluster import KMeans
import numpy as np

FLAGS = flags.FLAGS
flags.DEFINE_string("input_file", None, "Input image file.")
flags.DEFINE_string("output_file", None, "Output image file.")
flags.DEFINE_integer("ncolors", 10, "Number of colors.")
flags.DEFINE_integer("nsamples", 10000, "Number of samples for computing clusters.")

# Required flag.
flags.mark_flag_as_required("input_file")

def describe_image(img):
  img = img.reshape(-1, 3)
  (u, c) = np.unique(img, axis=0, return_counts=True)
  print("num pixels: ", np.sum(c))
  print("num colors: ", len(u))

def process_image(img, ncolors):
  orig_shape = (img.shape[0], img.shape[1], 4)

  # Reshape the image as a flat sequence of RGB values.
  img = img.reshape(-1, 3)

  # Randomly sample a smaller set of points to compute the clusters.
  # It is possible to run clustering on the whole image, but this is much
  # faster without incurring too much of quality loss.
  sampled = img[np.random.randint(img.shape[0], size=FLAGS.nsamples), :]

  # Compute clusters.
  kmeans = KMeans(n_clusters=ncolors, random_state=0).fit(sampled)

  # Extract centers, i.e. the set of RGB values of size ncolors.
  centers = np.rint(kmeans.cluster_centers_).astype(np.uint8)

  # Add alpha (transparency) channel values.
  centers = np.column_stack((centers,
                             np.array([0xff] * centers.shape[0], dtype=np.uint8)))
  
  # Include an extra RGBA value representing transparent background.
  centers = np.append(centers, np.array([[255, 255, 255, 0]]).astype(np.uint8), axis=0)
  
  kmeans = kmeans.predict(img)
  output_images = []
  for i in range(ncolors):
    mask_i = np.where(kmeans == i, i, ncolors)
    img_i = centers[mask_i].reshape(orig_shape)
    output_images.append(img_i)

  full_image = centers[kmeans].reshape(orig_shape)
  return (output_images, full_image)


def main(argv):
  img = np.asarray(Im.open(FLAGS.input_file))
  describe_image(img)
  
  (output_images, full_image) = process_image(img, FLAGS.ncolors)

  if FLAGS.output_file:
    Im.fromarray(full_image).save(FLAGS.output_file + "_full.png")
    for i in range(len(output_images)):
      Im.fromarray(output_images[i]).save(FLAGS.output_file + str(i) + ".png")

if __name__ == '__main__':
  app.run(main)
