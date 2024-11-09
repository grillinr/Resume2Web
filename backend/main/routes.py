from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from backend import UPLOAD_FOLDER

main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/data')
def data():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":"1999-01-01", 
        "programming":"python"
        }

@main.route('/', methods=['GET', 'POST'])
def home(): 
    return render_template('home.html')

@main.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':   
        f = request.files['file'] 
        f.save(f"{UPLOAD_FOLDER}/{f.filename}")   
    return render_template('upload.html')