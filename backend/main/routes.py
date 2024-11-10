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
        "about": resume_data['summary'],
        "bg_color": "#f9f8fd",
        "fg_color": "#5d5c61",
        "text_color": "#333",
        "font_family": "'Georgia', serif",
        "heading_font_family": "'Courier New', Courier, monospace",
        "body_font_size": "1rem",
        "body_text_align": "center",
        "heading_font_size": "2.5rem",
        "subheading_font_size": "1.5rem",
        "subheading_text_align": "center",
        "padding": "30px",
        "margin": "20px",
        "gap": "15px",
        "stack_items": "vertical",
        "list_direction": "column",
        "job_width": "30%",
        "job_margin": "0 0 15px 0",
        "container_max_width": "1100px",
        "container_margin": "0 auto",
        "header_bg_color": "#dfe7fd",
        "header_text_color": "#3b3a43",
        "header_padding": "30px",
        "header_text_align": "center",
        "skill_bg_color": "#a8e6cf",
        "skill_text_color": "#3b3a43",
        "skill_padding": "15px",
        "skill_border_radius": "10px",
        "job_bg_color": "#ffd3b6",
        "job_padding": "15px",
        "job_margin_bottom": "15px",
        "job_border_radius": "10px",
        "link_color": "#ff8b94",
        "link_hover_color": "#ff6f69",
        "contact_list_style": "square",
        "contact_item_margin": "10px 0"

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
    user_info = {key: val for key, val in info.items() if key in [
        "name", "email", "phone_number", "links", "education", "experience", "skills", "about"]}

    style_config = {key: val for key, val in info.items() if key not in [
        "name", "email", "phone_number", "links", "education", "experience", "skills", "about"]}
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
