from dotenv import load_dotenv
import os
import requests

load_dotenv()
api_url = os.getenv("API_URL")
api_key = os.getenv("API_KEY")


# Open the resume file in binary mode
with open("C:\\Users\\Derek\\OneDrive\\Desktop\\DerekCornielloResume.pdf", "rb") as file:
    files = {
        "file": file,
    }
    data = {
        "workspace": "ZPQbPdZu"
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    # Send the POST request with the file
    response = requests.post(api_url, headers=headers, files=files, data=data)

    # Check response status and print parsed data
    if response.status_code == 200:
        parsed_data = response.json()
        print(parsed_data)  # Parsed resume data
    else:
        print(f"Error {response.status_code}: {response.text}")
