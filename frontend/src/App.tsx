import { useState } from "react";
import "./App.css";
import ResumeForm from "./ResumeConfigForm";
// import StyleConfigForm from "./StyleConfigForm";


interface Education {
  name: string | null;
  date_range: string | null;
  majors: string[] | null;
  degrees: string | null;
}

interface Experience {
  title: string | null;
  company: string | null;
  months: string | null;
  desc: string | null;
}

interface ResumeData {
  name: string | null;
  email: string | null;
  phone_number: string | null;
  links: string[] | null;
  skills: string[] | null;
  education: Education[];
  experience: Experience[];
  about: string | null;
  bg_color: "#f9f8fd",
  fg_color: "#5d5c61",
  text_color: "#333",
  font_family: "'Georgia', serif",
  heading_font_family: "'Courier New', Courier, monospace",
  body_font_size: "1rem",
  body_text_align: "center",
  heading_font_size: "2.5rem",
  subheading_font_size: "1.5rem",
  subheading_text_align: "center",
  padding: "30px",
  margin: "20px",
  gap: "15px",
  stack_items: "vertical",
  list_direction: "column",
  job_width: "30%",
  job_margin: "0 0 15px 0",
  container_max_width: "1100px",
  container_margin: "0 auto",
  header_bg_color: "#dfe7fd",
  header_text_color: "#3b3a43",
  header_padding: "30px",
  header_text_align: "center",
  skill_bg_color: "#a8e6cf",
  skill_text_color: "#3b3a43",
  skill_padding: "15px",
  skill_border_radius: "10px",
  job_bg_color: "#ffd3b6",
  job_padding: "15px",
  job_margin_bottom: "15px",
  job_border_radius: "10px",
  link_color: "#ff8b94",
  link_hover_color: "#ff6f69",
  contact_list_style: "square",
  contact_item_margin: "10px 0"
}

/* interface PostSuccess {
  success: boolean;
  error: string | null;
} */

const App: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });
            const result: ResumeData = await response.json();
            console.log(result); // Display the response in the console
            setData(result); // Update the state with the response data
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (data: ResumeData) => {
        console.log(data); // Logging the data to ensure it's correct
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/generate', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to get file content');
            } else {
                console.log("Response was ok");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleFormSubmit = async (event: React.FormEvent, data: ResumeData): Promise<void> => {
        event.preventDefault(); // Prevent the form from submitting
        await handleSubmit(data); // Await handleSubmit to return a Promise<void>
    };


    const DownloadButton: React.FC = () => {
        const handleFileAction = async () => {
            if (!result) return; // Ensure there is result data before proceeding

            // Submit the form data (without event)
            await handleSubmit(result); // Only passing data

            // After submitting, proceed with generating and downloading the HTML
            try {
                const response = await fetch('http://localhost:5000/generate', {
                    method: 'POST',
                    body: JSON.stringify(result),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to get file content');
                }

                // Get the HTML content as text
                const htmlContent = await response.text();

                // Open content in a new tab
                const newTab = window.open('', '_blank');
                if (newTab) {
                    newTab.document.write(htmlContent);

                    // Add download button script to the new window
                    const scriptElement = newTab.document.createElement('script');
                    scriptElement.textContent = `
            function downloadPage() {
              const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'portfolio.html';
              a.click();
              window.URL.revokeObjectURL(url);
            }
          `;
                    newTab.document.head.appendChild(scriptElement);

                    // Add download button
                    const buttonElement = newTab.document.createElement('button');
                    buttonElement.innerHTML = 'Download';
                    buttonElement.setAttribute('onclick', 'downloadPage()');
                    buttonElement.style.position = 'fixed';
                    buttonElement.style.top = '10px';
                    buttonElement.style.right = '10px';
                    buttonElement.style.zIndex = '9999';
                    buttonElement.style.padding = '8px 16px';
                    buttonElement.style.backgroundColor = '#283447';
                    buttonElement.style.color = '#fff';
                    buttonElement.style.border = 'none';
                    buttonElement.style.borderRadius = '4px';
                    buttonElement.style.cursor = 'pointer';

                    newTab.document.body.appendChild(buttonElement);
                    newTab.document.close();
                }
            } catch (error) {
                console.error('Error handling file:', error);
            }
        };

        return (
            <button onClick={handleFileAction}>Save Resume & Preview</button>
        );
    };
    return (
        <>
            <img src="/resume2web.png" alt="Resume2Web Logo" className="logo" />
            <h1>Resume2Web</h1>
            <p>Upload your resume to see the extracted data.</p>

            {/* File upload form */}
            <form onSubmit={handleUpload}>
                <label htmlFor="fileUpload">Upload File:</label>
                <input id="fileUpload" type="file" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {loading && <p>Processing... Please wait.</p>}


            <div className="card">
                {result ? (
                    <>
                        <ResumeForm
                            data={result}
                            onSubmit={handleFormSubmit} // Use the wrapper function
                            onChange={setData}
                        />
                        <DownloadButton />
                    </>
                ) : (
                    <p>No data available. Upload a resume to extract information.</p>
                )}
            </div>
        </>
    );
};

export default App;
