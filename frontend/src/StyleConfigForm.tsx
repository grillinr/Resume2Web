import React, { useState } from 'react';

const StyleConfigForm = () => {
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
    contact_item_margin: "10px 0"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStyleConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(styleConfig);
    // Handle form submission here
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Style Configuration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Colors Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg mb-4">Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" title="Background color for the entire portfolio page">
                  Background Color
                </label>
                <input
                  type="color"
                  name="bg_color"
                  value={styleConfig.bg_color}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded"
                  title="Choose background color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Main text color for content">
                  Foreground Color
                </label>
                <input
                  type="color"
                  name="fg_color"
                  value={styleConfig.fg_color}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded"
                  title="Choose foreground color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="General text color throughout the portfolio">
                  Text Color
                </label>
                <input
                  type="color"
                  name="text_color"
                  value={styleConfig.text_color}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded"
                  title="Choose text color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Color for hyperlinks">
                  Link Color
                </label>
                <input
                  type="color"
                  name="link_color"
                  value={styleConfig.link_color}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1" title="Main font family for body text">
                  Body Font Family
                </label>
                <input
                  type="text"
                  name="font_family"
                  value={styleConfig.font_family}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter body font family (e.g., 'Arial, sans-serif')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Font family for headings">
                  Heading Font Family
                </label>
                <input
                  type="text"
                  name="heading_font_family"
                  value={styleConfig.heading_font_family}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter heading font family"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Size of body text">
                  Body Font Size
                </label>
                <input
                  type="text"
                  name="body_font_size"
                  value={styleConfig.body_font_size}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter body font size (e.g., '1rem')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Size of heading text">
                  Heading Font Size
                </label>
                <input
                  type="text"
                  name="heading_font_size"
                  value={styleConfig.heading_font_size}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1" title="Direction of stacked elements">
                  Stack Direction
                </label>
                <select
                  name="stack_items"
                  value={styleConfig.stack_items}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Choose stack direction"
                >
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Direction of list items">
                  List Direction
                </label>
                <select
                  name="list_direction"
                  value={styleConfig.list_direction}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Choose list direction"
                >
                  <option value="column">Column</option>
                  <option value="row">Row</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Maximum width of the container">
                  Container Max Width
                </label>
                <input
                  type="text"
                  name="container_max_width"
                  value={styleConfig.container_max_width}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter container max width (e.g., '1100px')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Gap between elements">
                  Element Gap
                </label>
                <input
                  type="text"
                  name="gap"
                  value={styleConfig.gap}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1" title="Width of job section">
                  Job Width
                </label>
                <input
                  type="text"
                  name="job_width"
                  value={styleConfig.job_width}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter job width (e.g., '30%')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Background color for job sections">
                  Job Background Color
                </label>
                <input
                  type="color"
                  name="job_bg_color"
                  value={styleConfig.job_bg_color}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded"
                  title="Choose job background color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Padding for job sections">
                  Job Padding
                </label>
                <input
                  type="text"
                  name="job_padding"
                  value={styleConfig.job_padding}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter job padding (e.g., '15px')"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" title="Border radius for job sections">
                  Job Border Radius
                </label>
                <input
                  type="text"
                  name="job_border_radius"
                  value={styleConfig.job_border_radius}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  title="Enter job border radius (e.g., '10px')"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};

export default StyleConfigForm;