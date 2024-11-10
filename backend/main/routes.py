from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from backend import UPLOAD_FOLDER
import requests
from dotenv import load_dotenv
from typing import Union, List, Dict
from pydparser import ResumeParser
# from pyresparser import ResumeParser


main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET_KEY")

@main.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        'name':"Nathan", 
        "age": 21,
        "date":"09/26/2003"
        }


@main.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')

@main.route('/upload', methods=['POST', 'GET'])
def upload_file():
    # Check if 'file' part is in the request
    if 'file' not in request.files:
        print("No file part in the request")
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # Check if a file was selected
    if file.filename == '':
        print("No selected file")
        return jsonify({"error": "No selected file"}), 400

    # Save the file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    print(f"File saved to {file_path}")
    resumeData = parse_resume(file_path)

    return resumeData

def parse_resume(resumePath):
    resumeJSON = ResumeParser(resumePath).get_extracted_data()
    return jsonify(resumeJSON)
