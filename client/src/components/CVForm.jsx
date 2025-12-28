import React, { useState } from 'react';
import { Plus, Minus, Upload, X } from 'lucide-react';

const CVForm = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const handlePersonalInfoChange = (field, value) => {
    onChange({
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePersonalInfoChange('profileImage', file);
    }
  };

  const handleArrayAdd = (section, item = {}) => {
    onChange({
      [section]: [...data[section], item]
    });
  };

  const handleArrayRemove = (section, index) => {
    const newArray = data[section].filter((_, i) => i !== index);
    onChange({
      [section]: newArray
    });
  };

  const handleArrayUpdate = (section, index, field, value) => {
    const newArray = data[section].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange({
      [section]: newArray
    });
  };

  const handleSkillsChange = (category, value) => {
    // Handle both comma and space-separated values
    const skills = value
      .split(/[,\n]/) // Split by comma or newline
      .map(skill => skill.trim()) // Trim whitespace
      .filter(skill => skill.length > 0); // Remove empty strings
    
    onChange({
      skills: {
        ...data.skills,
        [category]: skills
      }
    });
  };

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeSection === section.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Personal Information */}
      {activeSection === 'personal' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              {data.personalInfo.profileImage && (
                <div className="relative">
                  <img
                    src={data.personalInfo.profileImage instanceof File 
                      ? URL.createObjectURL(data.personalInfo.profileImage)
                      : data.personalInfo.profileImage
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button
                    onClick={() => handlePersonalInfoChange('profileImage', null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                className="form-input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                className="form-input"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                value={data.personalInfo.website}
                onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                className="form-input"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                value={data.personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                className="form-input"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="url"
                value={data.personalInfo.github}
                onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                className="form-input"
                placeholder="https://github.com/johndoe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={data.personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              className="form-textarea"
              rows="2"
              placeholder="123 Main St, City, State, Country"
            />
          </div>
        </div>
      )}

      {/* Summary */}
      {activeSection === 'summary' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
          <div>
            <textarea
              value={data.summary}
              onChange={(e) => onChange({ summary: e.target.value })}
              className="form-textarea"
              rows="4"
              placeholder="Write a brief professional summary highlighting your key skills and experience..."
            />
          </div>
        </div>
      )}

      {/* Experience */}
      {activeSection === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
            <button
              onClick={() => handleArrayAdd('experience', {
                jobTitle: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              })}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Experience</span>
            </button>
          </div>
          
          {data.experience.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                <button
                  onClick={() => handleArrayRemove('experience', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => handleArrayUpdate('experience', index, 'jobTitle', e.target.value)}
                  className="form-input"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleArrayUpdate('experience', index, 'company', e.target.value)}
                  className="form-input"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleArrayUpdate('experience', index, 'location', e.target.value)}
                  className="form-input"
                  placeholder="Location"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleArrayUpdate('experience', index, 'current', e.target.checked)}
                    className="rounded"
                  />
                  <label className="text-sm text-gray-700">Current Position</label>
                </div>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleArrayUpdate('experience', index, 'startDate', e.target.value)}
                  className="form-input"
                  placeholder="Start Date"
                />
                {!exp.current && (
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleArrayUpdate('experience', index, 'endDate', e.target.value)}
                    className="form-input"
                    placeholder="End Date"
                  />
                )}
              </div>
              
              <textarea
                value={exp.description}
                onChange={(e) => handleArrayUpdate('experience', index, 'description', e.target.value)}
                className="form-textarea"
                rows="3"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <button
              onClick={() => handleArrayAdd('education', {
                degree: '',
                institution: '',
                location: '',
                startDate: '',
                endDate: '',
                gpa: ''
              })}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Education</span>
            </button>
          </div>
          
          {data.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                <button
                  onClick={() => handleArrayRemove('education', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleArrayUpdate('education', index, 'degree', e.target.value)}
                  className="form-input"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleArrayUpdate('education', index, 'institution', e.target.value)}
                  className="form-input"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleArrayUpdate('education', index, 'location', e.target.value)}
                  className="form-input"
                  placeholder="Location"
                />
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleArrayUpdate('education', index, 'gpa', e.target.value)}
                  className="form-input"
                  placeholder="GPA (optional)"
                />
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleArrayUpdate('education', index, 'startDate', e.target.value)}
                  className="form-input"
                />
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleArrayUpdate('education', index, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              💡 These appear in "Additional Information" section in CV
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
            <strong>💡 How to add multiple skills:</strong>
            <br />
            <strong>Method 1:</strong> Separate with commas: JavaScript, Python, React
            <br />
            <strong>Method 2:</strong> Use new lines (press Enter between skills)
            <br />
            <div className="mt-2 text-blue-600">
              <strong>Current skills count:</strong> 
              Technical: {data.skills.technical.length}, 
              Languages: {data.skills.languages.length}, 
              Frameworks: {data.skills.frameworks.length}, 
              Tools: {data.skills.tools.length}, 
              Soft: {data.skills.soft.length}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Skills
                <span className="text-xs text-gray-500 ml-2">(separate with commas or new lines)</span>
              </label>
              <textarea
                value={data.skills.technical.join(', ')}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="JavaScript, Python, React, Node.js, MongoDB"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
                <span className="text-xs text-gray-500 ml-2">(separate with commas or new lines)</span>
              </label>
              <textarea
                value={data.skills.languages.join(', ')}
                onChange={(e) => handleSkillsChange('languages', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="English, Hindi, Spanish"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frameworks
                <span className="text-xs text-gray-500 ml-2">(separate with commas or new lines)</span>
              </label>
              <textarea
                value={data.skills.frameworks.join(', ')}
                onChange={(e) => handleSkillsChange('frameworks', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="React, Express.js, Bootstrap, Tailwind CSS"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tools & Platforms
                <span className="text-xs text-gray-500 ml-2">(separate with commas or new lines)</span>
              </label>
              <textarea
                value={data.skills.tools.join(', ')}
                onChange={(e) => handleSkillsChange('tools', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="Git, Docker, AWS, VS Code"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soft Skills
                <span className="text-xs text-gray-500 ml-2">(separate with commas or new lines)</span>
              </label>
              <textarea
                value={data.skills.soft.join(', ')}
                onChange={(e) => handleSkillsChange('soft', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="Leadership, Communication, Problem Solving, Team Player"
              />
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Projects</h3>
            <button
              onClick={() => handleArrayAdd('projects', {
                title: '',
                description: '',
                technologies: [],
                startDate: '',
                endDate: '',
                url: '',
                github: ''
              })}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>
          </div>
          
          {data.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                <button
                  onClick={() => handleArrayRemove('projects', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleArrayUpdate('projects', index, 'title', e.target.value)}
                  className="form-input"
                  placeholder="Project Title"
                />
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => {
                    const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                    handleArrayUpdate('projects', index, 'technologies', techs);
                  }}
                  className="form-input"
                  placeholder="Technologies (comma separated)"
                />
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => handleArrayUpdate('projects', index, 'startDate', e.target.value)}
                  className="form-input"
                />
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => handleArrayUpdate('projects', index, 'endDate', e.target.value)}
                  className="form-input"
                />
                <input
                  type="url"
                  value={project.url}
                  onChange={(e) => handleArrayUpdate('projects', index, 'url', e.target.value)}
                  className="form-input"
                  placeholder="Project URL"
                />
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) => handleArrayUpdate('projects', index, 'github', e.target.value)}
                  className="form-input"
                  placeholder="GitHub URL"
                />
              </div>
              
              <textarea
                value={project.description}
                onChange={(e) => handleArrayUpdate('projects', index, 'description', e.target.value)}
                className="form-textarea"
                rows="3"
                placeholder="Project description..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {activeSection === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
            <button
              onClick={() => handleArrayAdd('certifications', {
                name: '',
                issuer: '',
                date: '',
                url: ''
              })}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Certification</span>
            </button>
          </div>
          
          {data.certifications.map((cert, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Certification {index + 1}</h4>
                <button
                  onClick={() => handleArrayRemove('certifications', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleArrayUpdate('certifications', index, 'name', e.target.value)}
                  className="form-input"
                  placeholder="Certification Name"
                />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleArrayUpdate('certifications', index, 'issuer', e.target.value)}
                  className="form-input"
                  placeholder="Issuing Organization"
                />
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => handleArrayUpdate('certifications', index, 'date', e.target.value)}
                  className="form-input"
                />
                <input
                  type="url"
                  value={cert.url}
                  onChange={(e) => handleArrayUpdate('certifications', index, 'url', e.target.value)}
                  className="form-input"
                  placeholder="Certificate URL"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {activeSection === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              💡 Appears as separate "ACHIEVEMENTS" section
            </div>
            <button
              onClick={() => handleArrayAdd('achievements', {
                title: '',
                description: '',
                date: ''
              })}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Achievement</span>
            </button>
          </div>
          
          {data.achievements.map((achievement, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Achievement {index + 1}</h4>
                <button
                  onClick={() => handleArrayRemove('achievements', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => handleArrayUpdate('achievements', index, 'title', e.target.value)}
                  className="form-input"
                  placeholder="Achievement Title"
                />
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => handleArrayUpdate('achievements', index, 'date', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <textarea
                value={achievement.description}
                onChange={(e) => handleArrayUpdate('achievements', index, 'description', e.target.value)}
                className="form-textarea"
                rows="2"
                placeholder="Achievement description..."
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CVForm;