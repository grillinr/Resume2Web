import { useState } from "react";
import "./App.css";
import TagList from "./tags";

interface ResumeData {
  college_name: string | null;
  company_names: string[] | null;
  degree: string | null;
  designation: string | null;
  email: string | null;
  experience: string | null;
  linkedin: string | null;
  mobile_number: string | null;
  name: string | null;
  no_of_pages: number | null;
  skills: string[] | null;
  total_experience: number | null;
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ResumeData
  ) => {
    if (result) {
      const updatedResult = { ...result, [field]: e.target.value };
      setData(updatedResult);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
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

  const DownloadButton: React.FC = () => {
    const downloadFile = async () => {
      try {
        const response = await fetch('http://localhost:5000/generate', {
          method: 'POST',
          body: JSON.stringify(result),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to download file');
        }
  
        // Create a blob from the response
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        // Create a link to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'site.html'; // Suggested file name for download
        document.body.appendChild(link);
        link.click();
  
        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
  
    return <button onClick={downloadFile}>Download File</button>;
  };

  return (
    <>
      <img src="/resume2web.png" alt="Resume2Web Logo" className="logo" />
      <h1>Resume2Web</h1>
      <p>Upload your resume to see the extracted data.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fileUpload">Upload File:</label>
        <input id="fileUpload" type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading && (
        <p>Processing... Please wait.</p>
      )}
      <br />
      <div className="card">
        {result ? (
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={result?.name || ""}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={result?.email || ""}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </div>

              <div>
                <label htmlFor="mobile">Mobile:</label>
                <input
                  id="mobile"
                  type="tel"
                  value={result?.mobile_number || ""}
                  onChange={(e) => handleInputChange(e, "mobile_number")}
                />
              </div>

              <div>
                <label htmlFor="linkedin">LinkedIn:</label>
                <input
                  id="linkedin"
                  type="url"
                  value={result?.linkedin || ""}
                  onChange={(e) => handleInputChange(e, "linkedin")}
                />
              </div>

              <div>
                <label htmlFor="college">College:</label>
                <input
                  id="college"
                  type="text"
                  value={result?.college_name || ""}
                  onChange={(e) => handleInputChange(e, "college_name")}
                />
              </div>

              <div>
                <label htmlFor="degree">Degree:</label>
                <textarea
                  id="degree"
                  value={result?.degree || ""}
                  onChange={(e) => handleInputChange(e, "degree")}
                />
              </div>

              <div>
                <label htmlFor="designation">Designation:</label>
                <textarea
                  id="designation"
                  value={result?.designation || ""}
                  onChange={(e) => handleInputChange(e, "designation")}
                />
              </div>

              <div>
                <label htmlFor="experience">Experience:</label>
                <textarea
                  id="experience"
                  value={result?.experience || ""}
                  onChange={(e) => handleInputChange(e, "experience")}
                />
              </div>

              <div>
                <label htmlFor="totalExperience">Total Experience:</label>
                <input
                  id="totalExperience"
                  type="number"
                  value={result?.total_experience || ""}
                  onChange={(e) => handleInputChange(e, "total_experience")}
                />
              </div>

              <div>
                <TagList initialTags={result?.skills ? result.skills : []} tagName="skill"/>
              </div>

              <div>
                <TagList initialTags={result?.company_names ? result.company_names : []} tagName="companies"/>
              </div>

              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <p>No data available. Upload a resume to extract information.</p>
        )}
        <DownloadButton />
      </div>
    </>
  );
};

export default App;
