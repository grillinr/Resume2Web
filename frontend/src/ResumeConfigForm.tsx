import { useState } from "react";
import React from "react";
import TagList from "./tags";

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
}

interface ResumeFormProps {
  data: ResumeData;
  onSubmit: (event: React.FormEvent, data: ResumeData) => Promise<void>;
  onChange: (data: ResumeData) => void;
}

interface StyleConfig {
  bg_color: string;
  fg_color: string;
  text_color: string;
  font_family: string;
  heading_font_family: string;
  body_font_size: string;
  body_text_align: string;
  heading_font_size: string;
  subheading_font_size: string;
  subheading_text_align: string;
  padding: string;
  margin: string;
  gap: string;
  stack_items: string;
  list_direction: string;
  job_width: string;
  job_margin: string;
  container_max_width: string;
  container_margin: string;
  header_bg_color: string;
  header_text_color: string;
  header_padding: string;
  header_text_align: string;
  skill_bg_color: string;
  skill_text_color: string;
  skill_padding: string;
  skill_border_radius: string;
  job_bg_color: string;
  job_padding: string;
  job_margin_bottom: string;
  job_border_radius: string;
  link_color: string;
  link_hover_color: string;
  contact_list_style: string;
  contact_item_margin: string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onSubmit,
  onChange,
}) => {
  const [styleConfig, setStyleConfig] = useState({
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
    contact_item_margin: "10px 0",
  });

  const handleStyleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStyleConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof ResumeData,
    index: number,
    field: string
  ) => {
    const updatedData = { ...data };

    if (section === "education" || section === "experience") {
      updatedData[section] = [...(updatedData[section] as any[])];
      updatedData[section][index] = {
        ...updatedData[section][index],
        [field]: e.target.value,
      };
    } else {
      (updatedData[section] as string | null) = e.target.value;
    }

    onChange(updatedData);
  };

  const handleBasicInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ResumeData
  ) => {
    onChange({
      ...data,
      [field]: e.target.value,
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { name: null, date_range: null, majors: [], degrees: null },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...data.education];
    updatedEducation.splice(index, 1);
    onChange({
      ...data,
      education: updatedEducation,
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { title: null, company: null, months: null, desc: null },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...data.experience];
    updatedExperience.splice(index, 1);
    onChange({
      ...data,
      experience: updatedExperience,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(event, data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="personal-name"
              className="block text-sm font-medium"
            >
              Name
            </label>
            <input
              id="personal-name"
              type="text"
              value={data.name || ""}
              onChange={(e) => handleBasicInputChange(e, "name")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="personal-email"
              className="block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="personal-email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleBasicInputChange(e, "email")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="personal-phone"
              className="block text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              id="personal-phone"
              type="tel"
              value={data.phone_number || ""}
              onChange={(e) => handleBasicInputChange(e, "phone_number")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <TagList
          initialTags={data.links || []}
          onChange={(links) => onChange({ ...data, links })}
          tagName="Link"
        />
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Education
          </button>
        </div>

        {data.education.map((edu, index) => (
          <div key={index} className="p-4 border rounded space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Education #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`edu-name-${index}`}
                  className="block text-sm font-medium"
                >
                  Institution Name
                </label>
                <input
                  id={`edu-name-${index}`}
                  type="text"
                  value={edu.name || ""}
                  onChange={(e) =>
                    handleInputChange(e, "education", index, "name")
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edu-date-${index}`}
                  className="block text-sm font-medium"
                >
                  Date Range
                </label>
                <input
                  id={`edu-date-${index}`}
                  type="text"
                  value={edu.date_range || ""}
                  onChange={(e) =>
                    handleInputChange(e, "education", index, "date_range")
                  }
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2018-2022"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edu-degree-${index}`}
                  className="block text-sm font-medium"
                >
                  Degree
                </label>
                <input
                  id={`edu-degree-${index}`}
                  type="text"
                  value={edu.degrees || ""}
                  onChange={(e) =>
                    handleInputChange(e, "education", index, "degrees")
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <TagList
              initialTags={edu.majors || []}
              onChange={(majors) => {
                const updatedEducation = [...data.education];
                updatedEducation[index] = { ...edu, majors };
                onChange({ ...data, education: updatedEducation });
              }}
              tagName="Major"
            />
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>

        {data.experience.map((exp, index) => (
          <div key={index} className="p-4 border rounded space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`exp-title-${index}`}
                  className="block text-sm font-medium"
                >
                  Job Title
                </label>
                <input
                  id={`exp-title-${index}`}
                  type="text"
                  value={exp.title || ""}
                  onChange={(e) =>
                    handleInputChange(e, "experience", index, "title")
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`exp-company-${index}`}
                  className="block text-sm font-medium"
                >
                  Company
                </label>
                <input
                  id={`exp-company-${index}`}
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) =>
                    handleInputChange(e, "experience", index, "company")
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`exp-duration-${index}`}
                  className="block text-sm font-medium"
                >
                  Duration (months)
                </label>
                <input
                  id={`exp-duration-${index}`}
                  type="text"
                  value={exp.months || ""}
                  onChange={(e) =>
                    handleInputChange(e, "experience", index, "months")
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`exp-description-${index}`}
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id={`exp-description-${index}`}
                value={exp.desc || ""}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "description")
                }
                className="w-full p-2 border rounded h-32"
              />
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="space-y-2">
        <label htmlFor="personal-about" className="block text-sm font-medium">
          About
        </label>
        <textarea
          id="personal-about"
          value={data.about || ""}
          onChange={(e) => handleBasicInputChange(e, "about")}
          className="w-full p-2 border rounded h-32"
          placeholder="Write a brief introduction about yourself..."
        />
      </div>

      {/* Skills */}
      <TagList
        initialTags={data.skills || []}
        onChange={(skills) => onChange({ ...data, skills })}
        tagName="Skill"
      />
      {/* Colors Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-lg mb-4">Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Background color for the entire portfolio page"
            >
              Background Color
            </label>
            <input
              type="color"
              name="bg_color"
              value={styleConfig.bg_color}
              onChange={handleStyleInputChange}
              className="w-full h-10 rounded"
              title="Choose background color"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Main text color for content"
            >
              Foreground Color
            </label>
            <input
              type="color"
              name="fg_color"
              value={styleConfig.fg_color}
              onChange={handleStyleInputChange}
              className="w-full h-10 rounded"
              title="Choose foreground color"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="General text color throughout the portfolio"
            >
              Text Color
            </label>
            <input
              type="color"
              name="text_color"
              value={styleConfig.text_color}
              onChange={handleStyleInputChange}
              className="w-full h-10 rounded"
              title="Choose text color"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Color for hyperlinks"
            >
              Link Color
            </label>
            <input
              type="color"
              name="link_color"
              value={styleConfig.link_color}
              onChange={handleStyleInputChange}
              className="w-full h-10 rounded"
              title="Choose link color"
            />
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-lg mb-4">Typography</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Main font family for body text"
            >
              Body Font Family
            </label>
            <input
              type="text"
              name="font_family"
              value={styleConfig.font_family}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter body font family (e.g., 'Arial, sans-serif')"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Font family for headings"
            >
              Heading Font Family
            </label>
            <input
              type="text"
              name="heading_font_family"
              value={styleConfig.heading_font_family}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter heading font family"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Size of body text"
            >
              Body Font Size
            </label>
            <input
              type="text"
              name="body_font_size"
              value={styleConfig.body_font_size}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter body font size (e.g., '1rem')"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Size of heading text"
            >
              Heading Font Size
            </label>
            <input
              type="text"
              name="heading_font_size"
              value={styleConfig.heading_font_size}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter heading font size (e.g., '2.5rem')"
            />
          </div>
        </div>
      </div>

      {/* Layout Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-lg mb-4">Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Direction of stacked elements"
            >
              Stack Direction
            </label>
            <select
              name="stack_items"
              value={styleConfig.stack_items}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Choose stack direction"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Direction of list items"
            >
              List Direction
            </label>
            <select
              name="list_direction"
              value={styleConfig.list_direction}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Choose list direction"
            >
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Maximum width of the container"
            >
              Container Max Width
            </label>
            <input
              type="text"
              name="container_max_width"
              value={styleConfig.container_max_width}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter container max width (e.g., '1100px')"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Gap between elements"
            >
              Element Gap
            </label>
            <input
              type="text"
              name="gap"
              value={styleConfig.gap}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter gap size (e.g., '15px')"
            />
          </div>
        </div>
      </div>

      {/* Job Section Styling */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-lg mb-4">Job Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Width of job section"
            >
              Job Width
            </label>
            <input
              type="text"
              name="job_width"
              value={styleConfig.job_width}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter job width (e.g., '30%')"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Background color for job sections"
            >
              Job Background Color
            </label>
            <input
              type="color"
              name="job_bg_color"
              value={styleConfig.job_bg_color}
              onChange={handleStyleInputChange}
              className="w-full h-10 rounded"
              title="Choose job background color"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Padding for job sections"
            >
              Job Padding
            </label>
            <input
              type="text"
              name="job_padding"
              value={styleConfig.job_padding}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter job padding (e.g., '15px')"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              title="Border radius for job sections"
            >
              Job Border Radius
            </label>
            <input
              type="text"
              name="job_border_radius"
              value={styleConfig.job_border_radius}
              onChange={handleStyleInputChange}
              className="w-full p-2 border rounded"
              title="Enter job border radius (e.g., '10px')"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResumeForm;
