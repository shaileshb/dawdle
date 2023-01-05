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

## Jupyter notebooks.
[jupyter][jupyter] is a place to do prototyping / analysis in a notebook using pandas, numpy, seaborn etc.

### One time setup: Python virtualenv for pip packages.
```
$ virtualenv pyenv
$ . pyenv/bin/activate
$ pip install -r jupyter/requirements.txt
```

### How to run jupyter locally
```
$ . pyenv/bin/activate
$ jupyter-lab
```
This will start a local jupyter kernal on localhost:8888.

Alternatively, it is also possible to use Google Cloud -> Vertex AI -> Workbench to start a jupyter kernel on a GCP virtual machine.



[jupyter]: jupyter/
[colors.py]: image_processing/src/colors.py
