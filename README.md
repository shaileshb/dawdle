# A picture guessing puzzle

## Python image processing script.

[colors.py][colors.py] uses KMeans clustering for color quantization -- i.e. to reduce number of colors in an input image. It then generates separate image layers, one for each unique color. It can be run as follows:

### One time setup: Python virtualenv for pip packages.
```
$ virtualenv pyenv
$ . pyenv/bin/activate
$ pip install -r image_processing/requirements.txt
```

### How to run the script:
```
$ . pyenv/bin/activate
$ python image_processing/src/colors.py --ncolors=16 --input_file=<INPUT_IMAGE_FILE> --output_file=<OUTPUT_FILE_PREFIX>
```

[colors.py]: image_processing/src/colors.py