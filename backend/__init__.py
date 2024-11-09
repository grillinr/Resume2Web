from flask import Flask, request, jsonify, abort
import os
from dotenv import load_dotenv

load_dotenv()

UPLOAD_FOLDER = 'backend/uploads'

def create_app():
    
    
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    from backend.main.routes import main

    app.secret_key = os.getenv('SECRET_KEY')

    app.register_blueprint(main)

    return app