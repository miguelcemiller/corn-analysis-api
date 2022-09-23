import os
from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename
from uuid import uuid4

def save_image_pest(request):
    UPLOAD_PATH = join(dirname(realpath(__file__)), 'static\\images\\pests')

    if request.files['image'].filename != '':
        image = request.files['image']
        filename = str(uuid4()) + secure_filename(image.filename)
        image.save(os.path.join(UPLOAD_PATH, filename))
        return filename