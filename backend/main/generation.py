import os

SCAFFOLD = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name}'s Website</title>
    {style}
</head>
<body>
{body}
</body>
</html>
"""

STYLE = """
<style>
  body {{
    font-family: {font_family};
    margin: 0;
    padding: 0;
    background-color: {bg_color};
    color: {text_color};
    text-align: {body_text_align}
  }}

  header {{
    background-color: {header_bg_color};
    color: {header_text_color};
    padding: {header_padding};
    text-align: {header_text_align};
  }}

  h1, h2, h3, h4 {{
      text-align: {subheading_text_align}
  }}

  h1 {{
    margin: 0;
    font-size: {heading_font_size};
  }}

  h3 {{
    color: {fg_color};
    font-size: {subheading_font_size};
  }}

  .container {{
    padding: {padding};
    max-width: {container_max_width};
    margin: {container_margin};
    background-color: white;
  }}

  .skills-container {{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: {gap};
    margin-top: 10px;
  }}

  .skill {{
    background-color: {skill_bg_color};
    padding: {skill_padding};
    color: {skill_text_color};
    border-radius: {skill_border_radius};
    text-align: center;
  }}

  .job-list, .education-list {{
    list-style-type: {contact_list_style};
    padding: 0;
    display: flex;
    flex-direction: {list_direction};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }}

  .job, .education {{
    padding: {job_padding};
    background-color: {job_bg_color};
    margin-bottom: {job_margin_bottom};
    border-radius: {job_border_radius};
    width: {job_width};
    margin: {job_margin};
  }}

  .contact ul {{
    list-style-type: {contact_list_style};
    padding: 0;
  }}

  .contact li {{
    margin: {contact_item_margin};
  }}

  a {{
    color: {link_color};
    text-decoration: none;
  }}

  a:hover {{
    text-decoration: underline;
  }}

  .links-section {{
    margin-top: 20px;
  }}

  .container-section {{
    padding: 10px 0;
  }}
</style>
"""

HEADING = """
<header>
  <h1>{name}'s Personal Website</h1>
</header>
"""

ABOUTME = """
<section class="container-section">
  <h3>About Me:</h3>
  <p>{desc}</p>
</section>
"""

CONTACT = """
<section class="container-section contact">
  <h3>Contact Information</h3>
  <ul>
    <li>{email}</li>
    <li>{phone_number}</li>
  </ul>
</section>
"""

LINK = "<a href='{url}'>{url}</a><br>"

LINKSECTION = """
<section class="container-section links-section">
  <h3>Links for more on me:</h3>
  {links}
</section>
"""

JOB = """
<div class="job">
  <strong>{role}</strong> @ {company} from {start} to {end}.<br>
  Description: {desc}<br>
</div>
"""

JOBS = """
<section class="container-section">
  <h3>Job Experience:</h3>
  <div class="job-list">
    {jobs}
  </div>
</section>
"""

SCHOOL = """
<li class="education">
  <h4>{school}</h4><br>
  {major}, {degree}, from {start} to {end}.<br>
</li>
"""

SCHOOLS = """
<section class="container-section">
  <h3>Education</h3>
  <ul class="education-list">
    {schools}
  </ul>
</section>
"""

SKILL = "<div class='skill'>{skill}</div>"

SKILLS = """
<section class="container-section">
  <h4>Skills</h4>
  <div class="skills-container">
    {skills}
  </div>
</section>
"""


def format_links(links):
    return LINKSECTION.format(links="\n".join([LINK.format(url=link) for link in links]))


def format_jobs(jobs):
    # dict with "job", "company", "start", "end" (optional for present)
    return JOBS.format(jobs="\n".join([JOB.format(
        role=job["job"],
        company=job["company"],
        desc=job["description"],
        start=job["start"],
        end=job.get("end", "Present")
    ) for job in jobs]))


def format_schools(schools):
    # dict with "name", "major", "degree", "start", "end" (optional for present)
    return SCHOOLS.format(schools="\n".join([SCHOOL.format(
        school=school["name"],
        major=school["major"],
        degree=school["degree"],
        start=school["start"],
        end=school.get("end", "Present")
    ) for school in schools]))


def format_skills(skills):
    return SKILLS.format(skills="".join([SKILL.format(skill=skill) for skill in skills]))


# TEST_DATA_EXAMPLE
#
# test_data = {
#     "name": "Derek Corniello",
#     "email": "dummy@example.com",
#     "phone_number": "1234567890",
#     "about_me": "hi im derek",
#     "links": [
#         "https://www.linkedin.com/in/derek-corniello",
#         "https://github.com/DerekCorniello"
#     ],
#     "jobs": [
#         {
#             "job": "Software Engineer",
#             "company": "Tech Solutions Inc.",
#             "start": "January 2023",
#             "end": "Present",
#             "description": "Developing scalable web applications using Python, Django, and Vue.js."
#         },
#         {
#             "job": "Junior Developer",
#             "company": "Innovative Labs",
#             "start": "June 2021",
#             "end": "December 2022",
#             "description": "Assisted in building front-end features and improving website performance."
#         }
#     ],
#     "schools": [
#         {
#             "name": "University of Cincinnati",
#             "major": "Computer Science",
#             "degree": "Bachelor of Science",
#             "start": "August 2022",
#             "end": "Present"
#         },
#         {
#             "name": "University of Cincinnati",
#             "major": "Software Engineering",
#             "degree": "Master of Engineering",
#             "start": "August 2022",
#             "end": "Present"
#         }
#     ],
#     "skills": [
#         "Python",
#         "Django",
#         "Vue.js",
#         "Docker",
#         "PostgreSQL",
#         "JavaScript"
#     ]
# }
#
#
# STYLE_CONFIG EXAMPLE
#
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
def format_style(style_config):
    return STYLE.format(
        stack_items=style_config["stack_items"],
        list_direction=style_config["list_direction"],
        job_width=style_config["job_width"],
        job_margin=style_config["job_margin"],
        bg_color=style_config["bg_color"],
        fg_color=style_config["fg_color"],
        body_text_align=style_config["body_text_align"],
        text_color=style_config["text_color"],
        font_family=style_config["font_family"],
        heading_font_size=style_config["heading_font_size"],
        subheading_font_size=style_config["subheading_font_size"],
        subheading_text_align=style_config["subheading_text_align"],
        padding=style_config["padding"],
        margin=style_config["margin"],
        gap=style_config["gap"],
        container_max_width=style_config["container_max_width"],
        container_margin=style_config["container_margin"],
        header_bg_color=style_config["header_bg_color"],
        header_text_color=style_config["header_text_color"],
        header_padding=style_config["header_padding"],
        header_text_align=style_config["header_text_align"],
        skill_bg_color=style_config["skill_bg_color"],
        skill_text_color=style_config["skill_text_color"],
        skill_padding=style_config["skill_padding"],
        skill_border_radius=style_config["skill_border_radius"],
        job_bg_color=style_config["job_bg_color"],
        job_padding=style_config["job_padding"],
        job_margin_bottom=style_config["job_margin_bottom"],
        job_border_radius=style_config["job_border_radius"],
        contact_list_style=style_config["contact_list_style"],
        contact_item_margin=style_config["contact_item_margin"],
        link_color=style_config["link_color"],
        link_hover_color=style_config["link_hover_color"],
    )


def get_site(user_info, style_config):
    style = format_style(style_config)
    heading = HEADING.format(name=user_info["name"])
    aboutme = ABOUTME.format(desc=user_info["about_me"])
    contact = CONTACT.format(
        email=user_info["email"], phone_number=user_info["phone_number"])
    links = format_links(user_info["links"])
    education = format_schools(user_info["schools"])
    experience = format_jobs(user_info["jobs"])
    skills = format_skills(user_info["skills"])
    body = heading + aboutme + contact + links + education + experience + skills
    os.makedirs("../out", exist_ok=True)
    with open("../out/generated_page.html", "w+") as html_out:
        html_out.write(SCAFFOLD.format(
            name=user_info["name"], body=body, style=style))
