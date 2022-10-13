from os import name
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


@app.route('/submit', methods = ['POST'])
def submit():
    if request.method == 'POST':
        # Save image
        stage = request.form['stage']
        category = request.form['category']
        image_filename = save_image(request, category.lower()+'s')

        # Prediction
        prediction = predict_image(category.lower()+'s', image_filename)

        return {
            'stage': stage,
            'category': category,
            'image_filename': image_filename, 
            'prediction': prediction}

@app.route('/p/<image_filename>/<stage>/<category>/<prediction>', methods=['GET'])
def p(image_filename, stage, category, prediction):
    print('Image Filename: ', image_filename)
    print('Stage: ', stage)
    print('Category: ', category)
    print('Prediction: ', prediction)

    data = {
        'image_filename': image_filename,
        'stage': stage,
        'category': category,
        'prediction': prediction
    }

    if category == "Pest": 
        return render_template('pest.html', data=data)
    elif category == 'Disease':
        return render_template('disease.html')
    elif category == 'Nutrient':
        return render_template('nutrient.html')


@app.route('/prediction')
def prediction():
    return render_template('pest.html')