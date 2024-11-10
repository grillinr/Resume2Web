import { useState } from "react";
import "./App.css";
import ResumeForm from "./ResumeConfigForm";


interface ResumeData {
    name: string | null;
    email: string | null;
    phone_number: string | null;
    links: string[] | null;
    skills: string[] | null;
    education: {
        name: string | null;
        date_range: string | null;
        majors: string[] | null;
        degrees: string[] | null;
    } | null;
    experience: {
        title: string | null;
        company: string | null;
        months: string | null;
        description: string | null;
    } | null;
    about: string | null;
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
