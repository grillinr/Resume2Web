# Resume2Web
_Create an interactive and customizable website simply by uploading your resume!_
**Tech Stack:** 

## Description

**Resume2Web** is a web application using Flask and React as infrastructure that extracts key information from a resume file (in formats like PDF or text) and automatically generates an interactive, customizable website showcasing the parsed data. The resume processing is powered by [Affinda](https://app.affinda.com/), using their Free Tier. The website is a digital portfolio, highlighting key details such as the individual’s name, contact information, skills, experience, and education. 

This project simplifies the process of converting traditional resumes into interactive, visually appealing websites that can be easily shared with potential employers, clients, or collaborators.

### Intended Audience

This project is meant to help people who may not be enthralled into the art of designing and maintaining a website, or for those who need a beginning scaffold for more advanced sites!

## Key Features

- **Resume Parsing**: Extracts essential information from resumes, including name, email, phone number, skills, experience, and education.
- **Interactive Website Generation**: Automatically generates a customizable website that presents parsed resume information in an interactive, user-friendly format.
- **Customizable Layouts**: Allows users to choose from different website templates or customize their site according to personal preferences.
- **Easy-to-Use**: Users simply upload their resume, and the tool takes care of the rest—converting the resume into a fully functional website.
  
## How It Works

1. **Upload Resume**: The user uploads a resume file (PDF/docx/doc).
2. **Resume Parsing**: The application uses **Affinda** to extract key details from the resume, including contact information, skills, experience, and education.
3. **Website Generation**: The parsed data is fed into a Flask-based web application, which generates an interactive and customizable website.
4. **Customization**: Users can select from various templates or adjust styling options (such as colors, fonts, and layout) to personalize their site.
5. **Sharing**: Once the site is generated, users receive a download of their interactive resume website, ready to be shared.

## Host your file!

Hosting an HTML page involves uploading your HTML files to a server that makes them accessible over the internet. There are several ways to host a simple HTML page, ranging from free static site hosts to paid cloud services. Here's a step-by-step guide for different hosting options:

## Option 1: Hosting with GitHub Pages (Free)

GitHub Pages is a free hosting service that allows you to publish HTML files directly from a GitHub repository.

### Steps:
1. **Create a GitHub Account**: If you don't already have one, sign up for free at [github.com](https://github.com/).
2. **Create a New Repository**:
   - Go to your GitHub dashboard and click on "New Repository."
   - Name the repository (e.g., `my-website`), and initialize it with a README file (optional).
3. **Add Your HTML Files**:
   - On your local machine, create an HTML file (e.g., `index.html`).
   - Upload this file to your GitHub repository by clicking on the "Add file" button and selecting "Upload files."
4. **Enable GitHub Pages**:
   - In your repository settings, scroll down to the "GitHub Pages" section.
   - Under "Source," select the branch to deploy (usually `main`).
   - GitHub will generate a URL where your page can be accessed, such as `https://username.github.io/repository-name/`.

## Option 2: Hosting with Netlify (Free)

Netlify is another platform that provides free static site hosting with easy deployment from GitHub or other Git repositories.

### Steps:
1. **Sign Up for Netlify**: Go to [Netlify](https://www.netlify.com/) and create an account.
2. **Link GitHub Repository**:
   - On the Netlify dashboard, click "New Site from Git."
   - Connect your GitHub account and select the repository with your HTML files.
3. **Deploy Your Site**:
   - Netlify will automatically deploy your site and generate a URL (e.g., `https://your-site-name.netlify.app`).
   - You can also configure a custom domain if desired.

## Option 3: Hosting with a Web Hosting Provider (Paid)

If you need more control or additional features, you can use a paid web hosting service. Popular choices include Bluehost, HostGator, or DigitalOcean.

### Steps:
1. **Choose a Web Hosting Plan**: Sign up for a hosting plan based on your needs.
2. **Upload Your Files**:
   - Use an FTP client like FileZilla to upload your HTML files to the server.
   - Alternatively, many hosts provide a file manager where you can directly upload files.
3. **Access Your Site**:
   - Once uploaded, your HTML files will be accessible at your domain (e.g., `http://yourdomain.com`).
   - You may need to configure DNS settings if you're using a custom domain.

## Option 4: Hosting with Firebase Hosting (Free)

Firebase Hosting is a Google platform that offers free hosting for static websites.

### Steps:
1. **Install Firebase CLI**:
   - If you haven't already, install the Firebase CLI by running:
     ```bash
     npm install -g firebase-tools
     ```
2. **Initialize Firebase Project**:
   - In your project folder, run `firebase init` to initialize a Firebase project and select "Hosting."
   - Follow the prompts to set up your project.
3. **Deploy Your Site**:
   - Run `firebase deploy` to upload your HTML files to Firebase.
   - Firebase will provide a URL to access your site (e.g., `https://your-project-id.web.app`).

## Conclusion

Choosing a hosting option depends on your needs, such as whether you need a free solution, more control, or advanced features. GitHub Pages and Netlify are great for simple HTML pages, while Firebase and paid hosting providers offer additional flexibility and customization options.
