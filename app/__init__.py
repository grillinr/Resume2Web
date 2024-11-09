from flask import Flask, request, jsonify, abort
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)

    from app.main.routes import main

    app.secret_key = os.getenv('SECRET_KEY')

    app.register_blueprint(main)

    return app