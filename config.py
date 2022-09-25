import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

class Config: 
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'

    FLASK_APP = os.environ.get("FLASK_APP")
    FLASK_ENV = os.environ.get("FLASK_ENV")
    FLASK_RUN_PORT = os.environ.get("FLASK_RUN_PORT")
    FLASK_RUN_HOST = os.environ.get("FLASK_RUN_HOST")

DB_HOST = os.environ.get("DB_HOST")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")