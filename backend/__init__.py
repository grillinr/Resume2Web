from flask import Flask, request, jsonify, abort
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

UPLOAD_FOLDER = 'backend/uploads'

def create_app():
    
    
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    CORS(app)
    from backend.main.routes import main

    app.secret_key = os.getenv('SECRET_KEY')

    app.register_blueprint(main)

    return app