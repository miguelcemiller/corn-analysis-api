import os
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename
from uuid import uuid4

def save_image(request, category):
    UPLOAD_PATH_PEST = join(dirname(realpath(__file__)), 'static\\images\\' + category)

    if request.files['image'].filename != '':
        image = request.files['image']
        filename = str(uuid4()) + secure_filename(image.filename)
        image.save(os.path.join(UPLOAD_PATH_PEST, filename))
        return filename

import tensorflow
from keras.preprocessing import image
from glob import glob
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2

from keras.models import load_model


def path_to_tensor(img_path):
    # loads RGB image as PIL.Image.Image type
    img = image.load_img(img_path, target_size=(224, 224))
    # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
    x = image.img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    #print("New Shape ", np.expand_dims(x, axis=0).shape)
    return np.expand_dims(x, axis=0)

def predict_image(category, image_filename):
    pest_classifier = load_model(join(dirname(realpath(__file__)), 'static\\hdf5\\pest-classifier.hdf5'))

    PEST_CATEGORIES = ['Asiatic Corn Borer', 'Black Armyworm', 'Common Cutworm', 'Corn Aphids', 'Corn Earworm', 'Corn Plant Hopper', 'Corn Seedling Maggot', 'Corn Semilooper', 'True Armyworm', 'White Grub']
    
    DISEASE_CATEGORIES = []

    # Read and show image 
    # img_test = cv2.imread(join(dirname(realpath(__file__)), 'static\\images\\' + category + '\\') + image)
    # plt.imshow(img_test)
    # plt.show()

    # Image Path
    img_path = join(dirname(realpath(__file__)), 'static\\images\\' + category + '\\') + image_filename
    print('image_path: ', img_path)

    x = path_to_tensor(img_path)
    x = np.array(x)

    prediction = np.argmax(pest_classifier.predict(x))

    # print('Predicted Pest: ',  str(PEST_CATEGORIES[prediction]))

    return str(PEST_CATEGORIES[prediction])






