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
  description: string | null;
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

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onSubmit, onChange }) => {
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
        { title: null, company: null, months: null, description: null },
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
            <label htmlFor="personal-name" className="block text-sm font-medium">
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
            <label htmlFor="personal-email" className="block text-sm font-medium">
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
            <label htmlFor="personal-phone" className="block text-sm font-medium">
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
                <label htmlFor={`edu-name-${index}`} className="block text-sm font-medium">
                  Institution Name
                </label>
                <input
                  id={`edu-name-${index}`}
                  type="text"
                  value={edu.name || ""}
                  onChange={(e) => handleInputChange(e, "education", index, "name")}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`edu-date-${index}`} className="block text-sm font-medium">
                  Date Range
                </label>
                <input
                  id={`edu-date-${index}`}
                  type="text"
                  value={edu.date_range || ""}
                  onChange={(e) => handleInputChange(e, "education", index, "date_range")}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2018-2022"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`edu-degree-${index}`} className="block text-sm font-medium">
                  Degree
                </label>
                <input
                  id={`edu-degree-${index}`}
                  type="text"
                  value={edu.degrees || ""}
                  onChange={(e) => handleInputChange(e, "education", index, "degrees")}
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
                <label htmlFor={`exp-title-${index}`} className="block text-sm font-medium">
                  Job Title
                </label>
                <input
                  id={`exp-title-${index}`}
                  type="text"
                  value={exp.title || ""}
                  onChange={(e) => handleInputChange(e, "experience", index, "title")}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`exp-company-${index}`} className="block text-sm font-medium">
                  Company
                </label>
                <input
                  id={`exp-company-${index}`}
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => handleInputChange(e, "experience", index, "company")}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`exp-duration-${index}`} className="block text-sm font-medium">
                  Duration (months)
                </label>
                <input
                  id={`exp-duration-${index}`}
                  type="text"
                  value={exp.months || ""}
                  onChange={(e) => handleInputChange(e, "experience", index, "months")}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor={`exp-description-${index}`} className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id={`exp-description-${index}`}
                value={exp.description || ""}
                onChange={(e) => handleInputChange(e, "experience", index, "description")}
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
    </form>
  );
};

export default ResumeForm;