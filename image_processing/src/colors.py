""" A script to reduce the number of colors in an image, and split the image by
color layers.

This script uses sklearn.cluster.KMeans for color quantization. It then
generates a separate PNG file for each color. The color quantized full image can
be reconstructed by layering the images.
"""

from absl import app
from absl import flags
from PIL import Image as Im
from sklearn.cluster import KMeans
import numpy as np
import json

FLAGS = flags.FLAGS
flags.DEFINE_integer("ncolors", 10, "Number of colors.")
flags.DEFINE_string("input_file", None, "Input image file.")
flags.DEFINE_string("output_file", None,
                    'Output image file prefix. This script generates a separate'
                    'file for each color.')
flags.DEFINE_integer("nsamples", 10000,
                     'Number of samples for computing clusters.')

# Required flags.
flags.mark_flag_as_required("input_file")
flags.mark_flag_as_required("output_file")


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
    centers = np.append(centers, np.array([[255, 255, 255, 0]]).astype(np.uint8),
                        axis=0)

    # Map every pixel in the full image to a cluster.
    kmeans = kmeans.predict(img)

    # Split the output into separate images by color.
    output_images = []
    colors = []
    for i in range(ncolors):
        mask_i = np.where(kmeans == i, i, ncolors)
        img_i = centers[mask_i].reshape(orig_shape)
        output_images.append(img_i)
        colors.append('{:02X}{:02X}{:02X}'.format(*centers[i]))
    full_image = centers[kmeans].reshape(orig_shape)
    return (colors, output_images, full_image)


def main(argv):
    img = np.asarray(Im.open(FLAGS.input_file))
    describe_image(img)

    (colors, output_images, full_image) = process_image(img, FLAGS.ncolors)

    if FLAGS.output_file:
        with open(FLAGS.output_file + "_colors.json", 'w') as fd:
            fd.write(json.dumps({'colors': colors}))
            fd.write('\n')
            fd.close()
        Im.fromarray(full_image).save(FLAGS.output_file + "_full.png")
        for i in range(len(output_images)):
            filename = '{:s}_{:s}_{:d}.png'.format(
                FLAGS.output_file, colors[i], i)
            Im.fromarray(output_images[i]).save(filename)


if __name__ == '__main__':
    app.run(main)
