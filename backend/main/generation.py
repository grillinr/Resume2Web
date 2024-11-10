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
  <strong>{role}</strong> @ {company} for {months}.<br>
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
  {majors}, {degrees}, {date_range}.<br>
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

# Functions to format data
def format_links(links):
    return LINKSECTION.format(links="\n".join([LINK.format(url=link) for link in links]))

def format_jobs(job):
    if not job:
        return ""
    return JOBS.format(jobs=JOB.format(
        role=job[0]["title"],
        company=job[0]["company"],
        months=job[0]["months"],
        desc=job[0]["desc"]
    ))

def format_schools(education):
    if not education:
        return ""
    return SCHOOLS.format(schools=SCHOOL.format(
        school=education[0]["name"],
        majors=", ".join(education[0]["majors"]),
        degrees=", ".join(education[0]["degrees"]),
        date_range=education[0]["date_range"]
    ))

def format_skills(skills):
    if not skills:
        return ""
    return SKILLS.format(skills="".join([SKILL.format(skill=skill) for skill in skills]))

def format_style(style_config):
    return STYLE.format(**style_config)

# Generate HTML
def get_site(user_info, style_config):
    style = format_style(style_config)
    heading = HEADING.format(name=user_info["name"] or "My")
    aboutme = ABOUTME.format(desc=user_info["about"] or "No description available.")
    contact = CONTACT.format(
        email=user_info["email"] or "No email provided",
        phone_number=user_info["phone_number"] or "No phone number provided"
    )
    links = format_links(user_info["links"] or [])
    education = format_schools(user_info["education"])
    experience = format_jobs(user_info["experience"])
    skills = format_skills([])  # No skills list provided in `resume_data`
    
    body = heading + aboutme + contact + links + education + experience + skills
    os.makedirs("../out", exist_ok=True)
    with open("../out/generated_page.html", "w+") as html_out:
        html_out.write(SCAFFOLD.format(
            name=user_info["name"] or "My",
            body=body,
            style=style
        ))
