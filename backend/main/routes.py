from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response
import os
import json
from backend import UPLOAD_FOLDER
import requests
from dotenv import load_dotenv
from typing import Union, List, Dict

main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET_KEY")

main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')


@main.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        f.save(f"{UPLOAD_FOLDER}/{f.filename}")
    return render_template('upload.html')


class CandidateInformation:

    def __init__(self, fname: str, lname: str, email: str,
                 phone: Union[str, int], skills: List[str],
                 work: Dict[str, str], links: List[str]):
        self.fname = fname
        self.lname = lname
        self.email = email
        self.phone = phone
        self.skills = skills
        self.work = work
        self.links = links

    @ classmethod
    def convert_resume(self, file):
        pass

    @ classmethod
    def convert_linkedin(self, data):
        pass

    def to_json(self):
        return {
            "name": self.fname + " " + self.lname,
            "email": self.email,
            "phone": self.phone,
            "skills": self.skills,
            "work": self.work,
            "links": self.links
        }
