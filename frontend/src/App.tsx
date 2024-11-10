import { useState } from "react";
import "./App.css";

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
    e: React.ChangeEvent<HTMLInputElement>,
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
                <input
                  id="degree"
                  type="text"
                  value={result?.degree || ""}
                  onChange={(e) => handleInputChange(e, "degree")}
                />
              </div>

              <div>
                <label htmlFor="designation">Designation:</label>
                <input
                  id="designation"
                  type="text"
                  value={result?.designation || ""}
                  onChange={(e) => handleInputChange(e, "designation")}
                />
              </div>

              <div>
                <label htmlFor="experience">Experience:</label>
                <input
                  id="experience"
                  type="text"
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
                <label htmlFor="pages">No of Pages:</label>
                <input
                  id="pages"
                  type="number"
                  value={result?.no_of_pages || ""}
                  onChange={(e) => handleInputChange(e, "no_of_pages")}
                />
              </div>

              <div>
                <label htmlFor="skills">Skills:</label>
                <input
                  id="skills"
                  type="text"
                  value={result?.skills ? result.skills.join(", ") : ""}
                  onChange={(e) => handleInputChange(e, "skills")}
                />
              </div>

              <div>
                <label htmlFor="companies">Companies:</label>
                <input
                  id="companies"
                  type="text"
                  value={
                    result?.company_names ? result.company_names.join(", ") : ""
                  }
                  onChange={(e) => handleInputChange(e, "company_names")}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <p>No data available. Upload a resume to extract information.</p>
        )}
      </div>
    </>
  );
};

export default App;
