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
    resumeData = parse_resume(file_path)

    return resumeData


def parse_resume(resumePath):
    # DEBUG LINE:
    with open("data.json", "r") as file:
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
    # user_info = request.json
    # style_config = {
    #     "bg_color": "#f9f8fd",
    #     "fg_color": "#5d5c61",
    #     "text_color": "#333",
    #     "font_family": "'Georgia', serif",
    #     "heading_font_family": "'Courier New', Courier, monospace",
    #     "body_font_size": "1rem",
    #     "body_text_align": "center",
    #     "heading_font_size": "2.5rem",
    #     "subheading_font_size": "1.5rem",
    #     "subheading_text_align": "center",
    #     "padding": "30px",
    #     "margin": "20px",
    #     "gap": "15px",
    #     "stack_items": "vertical",  # or "horizontal"
    #     "list_direction": "column",  # or "row",
    #     "job_width": "30%",  # or "100%",
    #     "job_margin": "0 0 15px 0",  # or "10px",
    #     "container_max_width": "1100px",
    #     "container_margin": "0 auto",
    #     "header_bg_color": "#dfe7fd",
    #     "header_text_color": "#3b3a43",
    #     "header_padding": "30px",
    #     "header_text_align": "center",
    #     "skill_bg_color": "#a8e6cf",
    #     "skill_text_color": "#3b3a43",
    #     "skill_padding": "15px",
    #     "skill_border_radius": "10px",
    #     "job_bg_color": "#ffd3b6",
    #     "job_padding": "15px",
    #     "job_margin_bottom": "15px",
    #     "job_border_radius": "10px",
    #     "link_color": "#ff8b94",
    #     "link_hover_color": "#ff6f69",
    #     "contact_list_style": "square",
    #     "contact_item_margin": "10px 0",
    # }

    # get_site(user_info, style_config)

    # send_from_directory(directory="backend/out", path="generated_page.html")

    # return jsonify({"sucess": True, "error": "None"})

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

    if __name__ == "__main__":
        parse_resume(
            "C:\\Users\\Derek\\OneDrive\\Desktop\\DerekCornielloResume.pdf")
