import React from 'react';
import { Mail, Phone, Globe, MapPin, Linkedin, Github } from 'lucide-react';

const CVPreview = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate, endDate, current) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-lg" style={{ fontSize: '11px', lineHeight: '1.3', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section - Matching your CV layout */}
      <div className="flex items-start p-6 pb-4">
        {/* Profile Image - Left side like your CV */}
        {data.personalInfo.profileImage && (
          <div className="flex-shrink-0 mr-6">
            <img
              src={data.personalInfo.profileImage instanceof File 
                ? URL.createObjectURL(data.personalInfo.profileImage)
                : data.personalInfo.profileImage
              }
              alt="Profile"
              className="w-24 h-32 object-cover border border-gray-300"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        )}
        
        {/* Personal Info - Right side like your CV */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-800 mb-3 uppercase tracking-wider">
            {data.personalInfo.fullName || 'FULL NAME'}
          </h1>
          
          <div className="space-y-1 text-xs">
            <div className="grid grid-cols-1 gap-1">
              {data.personalInfo.address && (
                <div>
                  <span className="font-semibold">Address:</span>
                  <span className="ml-2">{data.personalInfo.address}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div>
                  <span className="font-semibold">Phone:</span>
                  <span className="ml-2">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.email && (
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="ml-2">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div>
                  <span className="font-semibold">Website:</span>
                  <span className="ml-2 text-blue-600">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        {/* Summary Section */}
        {data.summary && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
              SUMMARY
            </h2>
            <p className="text-xs text-gray-800 leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {/* Projects Section - Matching your layout */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-gray-900">{project.title}</h3>
                      <p className="text-xs text-gray-700 italic">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 ml-4 text-right">
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                  </div>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-1">
                      <span className="text-xs font-semibold">Technologies: </span>
                      <span className="text-xs">{project.technologies.join(', ')}</span>
                    </div>
                  )}
                  
                  <div className="flex space-x-4 text-xs">
                    {project.url && (
                      <span>
                        <span className="font-semibold">Live Project: </span>
                        <span className="text-blue-600">{project.url}</span>
                      </span>
                    )}
                    {project.github && (
                      <span>
                        <span className="font-semibold">Tech: </span>
                        <span className="text-blue-600">{project.github}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section - Matching your layout */}
        {data.education && data.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xs text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-700 italic">{edu.institution}</p>
                      {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Percentage: </span>{edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information Section - Matching your layout */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
            ADDITIONAL INFORMATION
          </h2>
          
          {/* Technical Skills */}
          {data.skills.technical && data.skills.technical.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Technical Skills: </span>
              <span className="text-xs">{data.skills.technical.join(', ')}</span>
            </div>
          )}
          
          {/* Languages */}
          {data.skills.languages && data.skills.languages.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Languages: </span>
              <span className="text-xs">{data.skills.languages.join(', ')}</span>
            </div>
          )}
          
          {/* Frameworks */}
          {data.skills.frameworks && data.skills.frameworks.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Frameworks: </span>
              <span className="text-xs">{data.skills.frameworks.join(', ')}</span>
            </div>
          )}
          
          {/* Tools & Platforms */}
          {data.skills.tools && data.skills.tools.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Tools & Platforms: </span>
              <span className="text-xs">{data.skills.tools.join(', ')}</span>
            </div>
          )}
          
          {/* Soft Skills */}
          {data.skills.soft && data.skills.soft.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Soft Skills: </span>
              <span className="text-xs">{data.skills.soft.join(', ')}</span>
            </div>
          )}
          
          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-semibold">Certifications: </span>
              <span className="text-xs">
                {data.certifications.map(cert => cert.name).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Achievements Section - Separate section */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-2">
              {data.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-gray-900">{achievement.title}</h3>
                      {achievement.description && (
                        <p className="text-xs text-gray-700 mt-1">{achievement.description}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 ml-2">
                      {achievement.date && formatDate(achievement.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-blue-300 pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-xs text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-xs text-gray-700">{exp.company}</p>
                      {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="mt-1">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="text-xs text-gray-700 mb-1">• {line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;