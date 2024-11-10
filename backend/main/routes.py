from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from backend import UPLOAD_FOLDER
import requests
from dotenv import load_dotenv
from typing import Union, List, Dict
from pydparser import ResumeParser


main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET_KEY")

main = Blueprint('main', __name__)

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


@main.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        if request.files['resume']:
            resume = parse_resume(request.files['resume'])
            print(type(resume))
            return jsonify(resume)
        if request.files['linkedin']:
            parse_resume(request.files['linkedin'])
    return render_template('upload.html', resume=request.args.get('resume'))

def parse_linkedin(linkedin):
    extension = linkedin.filename.rsplit('.', 1)[1].lower()
    filename = f"{UPLOAD_FOLDER}/resume.{extension}"
    linkedin.save(filename)
    # data = parser.get_many(parser.extract_pdf(filename))

def parse_resume(resume):
    extension = resume.filename.rsplit('.', 1)[1].lower()
    resume.save(f"{UPLOAD_FOLDER}/resume.{extension}")
    resumeJSON = ResumeParser(f"{UPLOAD_FOLDER}/resume.{extension}").get_extracted_data()
    return resumeJSON
