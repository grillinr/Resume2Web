from flask import render_template, request, Blueprint, jsonify, abort, redirect, url_for, flash, make_response, send_from_directory
import os
from backend import UPLOAD_FOLDER
from .generation import get_site
import requests
from dotenv import load_dotenv
import json

load_dotenv()
api_url = os.getenv("API_URL")
api_key = os.getenv("API_KEY")

main = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


load_dotenv()
api_url = os.getenv("API_URL")
api_key = os.getenv("API_KEY")
workspace = os.getenv("API_WORKSPACE")


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
    file_path = os.path.join(UPLOAD_FOLDER, "resume.pdf")
    file.save(file_path)
    print(f"File saved to {file_path}")
    resume_data = parse_resume(file_path)['data']

    education = []
    for i in range(len(resume_data['education'])):
        edu = resume_data['education'][i]['parsed']
        education.append({
            'name': edu["educationOrganization"]['parsed'],
            'date_range': edu['educationDateRange']['raw'],
            'majors': [edu['educationMajor'][i]['raw']
                       for i in range(len(edu['educationMajor']))],
            'degrees': edu['educationLevel']['parsed']['label'],
        })
    experience = []
    for i in range(len(resume_data['workExperience'])):
        exp = resume_data['workExperience'][i]['parsed']
        months = exp.get('workExperienceDateRange', None)
        experience.append({
            'company': exp['workExperienceOrganization']['parsed'],
            'months': months['parsed']['durationInMonths'] if months else "",
            'title': exp['jobTitle']['raw'],
            'desc': exp['jobDescription']['parsed'],
        })

    return {
        "name": resume_data['candidateName']['raw'],
        "email": [resume_data['email'][i]['raw'] for i in range(len(resume_data['email']))],
        "phone_number": [resume_data['phoneNumber'][i]['raw'] for i in range(len(resume_data['phoneNumber']))],
        "links": [resume_data['website'][i]['raw'] for i in range(len(resume_data['website']))],
        "education": education,
        "experience": experience,
        "skills": list(set([resume_data['skill'][i]['raw'].replace(",", "").lower() for i in range(len(resume_data['skill']))])),
        "about": resume_data['summary']
    }

    return jsonify(resume_data)


def parse_resume(resumePath):
    # DEBUG LINE:
    path = os.path.join(os.path.dirname(__file__), 'data.json')
    with open(path, "r") as file:
        return json.load(file)

    with open(resumePath, "rb") as file:
        files = {
            "file": file,
        }
        data = {
            "workspace": workspace,
        }
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        response = requests.post(
            api_url, headers=headers, files=files, data=data)

        if response.status_code == 200:
            parsed_data = response.json()
            print(parsed_data)  # Parsed resume data
        else:
            print(f"Error {response.status_code}: {response.text}")


@main.route('/generate', methods=['POST'])
def generate():
    info = request.json
    user_info = info["user_info"]
    style_config = info["style_config"]
    get_site(user_info, style_config)

    try:
        print("Trying to send file")
        dir = os.path.join(os.path.dirname(__file__), '../out')
        return send_from_directory(directory=dir, path="generated_page.html", as_attachment=True)
    except FileNotFoundError:
        print("File not found")
        return jsonify({"error": "File not found"})
    except Exception as e:
        print(e)
        return jsonify({"error": "A server error occurred."}), 500
