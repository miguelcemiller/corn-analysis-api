from flask import request, render_template
from app import app
from utils import *
from models import Pests
from app import db

from flask_restful import marshal_with, fields


PestFields = {
    'id': fields.Integer,
    'name': fields.String,
    'image': fields.String
}

@app.route('/', methods = ['POST', 'GET'])
def home():
    if request.method == 'POST':
        name = 'atlantic_ocean'
        image = save_image_pest(request)

        pest = Pests(name=name, image=image)

        db.session.add(pest)
        db.session.commit()
        
        return render_template("index.html")

    else:
        return render_template("index.html")

@app.route('/api/pests', methods = ['POST', 'GET'])
@marshal_with(PestFields)
def pests():
    pests = Pests.query.all()
    return pests


