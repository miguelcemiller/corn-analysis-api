from flask import request, render_template, jsonify
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
        image = save_image(request)

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


@app.route('/prediction', methods = ['GET', 'POST'])
def submit():
    if request.method == 'POST':
        # Request.json does not work
        stage = request.form['stage']
        category = request.form['category']

        print(request.files['image'])
        return {'success': 'success'}

    else:
        category = 'Disease'
        if category == "Pest": 
            return render_template('pest.html')
        elif category == 'Disease':
            return render_template('disease.html')


