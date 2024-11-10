import React from "react";
import TagList from "./tags";

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

interface ResumeFormProps {
  data: ResumeData;
  onSubmit: (event: React.FormEvent, data: ResumeData) => Promise<void>;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onSubmit,
  onChange,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof ResumeData,
    field?: string
  ) => {
    let updatedData = { ...data };

    if (field && (section === "education" || section === "experience")) {
      updatedData[section] = {
        ...(updatedData[section] as any),
        [field]: e.target.value,
      };
    } else {
      (updatedData[section] as string | null) = e.target.value;
    }

    onChange(updatedData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(event, data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={data.name || ""}
              onChange={(e) => handleInputChange(e, "name")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleInputChange(e, "email")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={data.phone_number || ""}
              onChange={(e) => handleInputChange(e, "phone_number")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <TagList initialTags={data.links || []} onChange={(links) => onChange({ ...data, links })} tagName="Link" />
            
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="education-name"
              className="block text-sm font-medium"
            >
              Institution Name
            </label>
            <input
              id="education-name"
              type="text"
              value={data.education?.name || ""}
              onChange={(e) => handleInputChange(e, "education", "name")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date-range" className="block text-sm font-medium">
              Date Range
            </label>
            <input
              id="date-range"
              type="text"
              value={data.education?.date_range || ""}
              onChange={(e) => handleInputChange(e, "education", "date_range")}
              className="w-full p-2 border rounded"
              placeholder="e.g., 2018-2022"
            />
          </div>

          <TagList
            initialTags={data.education?.majors || []}
            onChange={(majors) =>
              onChange({
                ...data,
                education: {
                  ...data.education,
                  majors,
                  name: data.education?.name || null,
                  date_range: data.education?.date_range || null,
                  degrees: data.education?.degrees || null,
                },
              })
            }
            tagName="Major"
          />

          <TagList
            initialTags={data.education?.degrees || []}
            onChange={(degrees) =>
              onChange({
                ...data,
                education: {
                  ...data.education,
                  degrees,
                  name: data.education?.name || null,
                  date_range: data.education?.date_range || null,
                  majors: data.education?.majors || null,
                },
              })
            }
            tagName="Degree"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="job-title" className="block text-sm font-medium">
              Job Title
            </label>
            <input
              id="job-title"
              type="text"
              value={data.experience?.title || ""}
              onChange={(e) => handleInputChange(e, "experience", "title")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={data.experience?.company || ""}
              onChange={(e) => handleInputChange(e, "experience", "company")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="months" className="block text-sm font-medium">
              Duration (months)
            </label>
            <input
              id="months"
              type="text"
              value={data.experience?.months || ""}
              onChange={(e) => handleInputChange(e, "experience", "months")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={data.experience?.description || ""}
              onChange={(e) =>
                handleInputChange(e, "experience", "description")
              }
              className="w-full p-2 border rounded h-32"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <label htmlFor="about" className="block text-sm font-medium">
          About
        </label>
        <textarea
          id="about"
          value={data.about || ""}
          onChange={(e) => handleInputChange(e, "about")}
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
