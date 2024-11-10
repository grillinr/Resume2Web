import PyPDF2
import re
import pdb


def pdf_to_text(pdf_file_path):
    with open(pdf_file_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""

        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    return text


def remove_spaces(text):
    pattern = r'\s*([.,/|\\+=\-_?\–\:])\s*'
    cleaned_text = re.sub(pattern, r'\1', text)
    if cleaned_text == text:
        return cleaned_text
    else:
        return remove_spaces(cleaned_text)


def get_parsed_data_from_resume():
    # "../../uploads/resume.pdf"  # Replace with your PDF file path
    pdf_file_path = "C:\\Users\\Derek\\OneDrive\\Desktop\\DerekCornielloResume.pdf"
    text = remove_spaces(pdf_to_text(pdf_file_path))
    print(text)
    data = {}

    name_exp = r"([A-Za-z]+(?:['-][A-Za-z]+)*) ([A-Za-z]+(?:['-][A-Za-z]+)*(?: [A-Za-z]+(?:['-][A-Za-z]+)*)*)"
    name = re.search(name_exp, text).group(0)
    data["name"] = name if name is not None else ""

    phone_exp = r"(?:\+?\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})"
    phone_match = re.search(phone_exp, text)
    phone = ''.join(phone_match.groups())
    data["phone_number"] = phone if phone is not None else ""

    email_exp = r"[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    email = re.search(email_exp, text).group(0)
    data["email"] = email if email is not None else ""

    links_exp = r"(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*(?:\/[^\|\s]*)?"
    links = [link for link in re.findall(
        links_exp, text) if "mail" not in link.lower() and "js" not in link.lower()]
    data["links"] = links if links is not None else []

    # THIS DOES NOT WORK
    skills_exp = r"(?i)\nskills[-:]*\n(.*?)(?=\n\s*\n|$)"
    skills = re.search(skills_exp, text, re.DOTALL | re.MULTILINE)
    print(skills.groups())


if __name__ == "__main__":
    get_parsed_data_from_resume()
