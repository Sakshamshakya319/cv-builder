import React from 'react';

const ResumePreview = ({ data }) => {
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
    <div className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-lg" style={{ fontSize: '10px', lineHeight: '1.2', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section - Matching your resume layout */}
      <div className="text-center p-4 pb-2">
        <h1 className="text-xl font-bold text-blue-700 mb-1 uppercase tracking-wider">
          {data.personalInfo.fullName || 'FULL NAME'}
        </h1>
        
        <div className="flex justify-center items-center space-x-2 text-xs text-gray-700 mb-1">
          <span className="font-semibold">LinkedIn:</span>
          <span className="text-blue-600">{data.personalInfo.linkedin || 'linkedin.com/in/username'}</span>
          <span>•</span>
          <span className="font-semibold">Email:</span>
          <span>{data.personalInfo.email || 'email@example.com'}</span>
        </div>
        
        <div className="flex justify-center items-center space-x-2 text-xs text-gray-700 mb-1">
          <span className="font-semibold">GitHub:</span>
          <span className="text-blue-600">{data.personalInfo.github || 'github.com/username'}</span>
          <span>•</span>
          <span className="font-semibold">Mobile:</span>
          <span>{data.personalInfo.phone || '+1-234-567-8900'}</span>
        </div>
        
        <div className="text-xs text-gray-700">
          <span className="font-semibold">Digital Portfolio:</span>
          <span className="text-blue-600 ml-1">{data.personalInfo.website || 'portfolio.com'}</span>
        </div>
      </div>

      <div className="px-4">
        {/* Skills Section - First like your resume */}
        <div className="mb-3">
          <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
            SKILLS
          </h2>
          
          <div className="space-y-1 text-xs">
            {data.skills.technical && data.skills.technical.length > 0 && (
              <div>
                <span className="font-semibold">Languages: </span>
                <span>{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.frameworks && data.skills.frameworks.length > 0 && (
              <div>
                <span className="font-semibold">Frameworks: </span>
                <span>{data.skills.frameworks.join(', ')}</span>
              </div>
            )}
            {data.skills.tools && data.skills.tools.length > 0 && (
              <div>
                <span className="font-semibold">Tools/Platforms: </span>
                <span>{data.skills.tools.join(', ')}</span>
              </div>
            )}
            {data.skills.languages && data.skills.languages.length > 0 && (
              <div>
                <span className="font-semibold">Spoken Languages: </span>
                <span>{data.skills.languages.join(', ')}</span>
              </div>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <div>
                <span className="font-semibold">Soft Skills: </span>
                <span>{data.skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section - Matching your resume layout */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-3">
            <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-2">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-blue-700">{project.title}: 
                        <span className="font-normal text-gray-800 ml-1">{project.description}</span>
                      </h3>
                    </div>
                    <div className="text-xs text-gray-600 ml-2">
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                  </div>
                  
                  <div className="ml-2 space-y-1">
                    {project.description && (
                      <p className="text-xs text-gray-800">• {project.description}</p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-xs">
                        <span className="font-semibold">Tech: </span>
                        {project.technologies.join(', ')}
                      </p>
                    )}
                    
                    <div className="flex space-x-3 text-xs">
                      {project.url && (
                        <span>
                          <span className="font-semibold">Live Project: </span>
                          <span className="text-blue-600">{project.url}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-3">
            <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
              CERTIFICATES
            </h2>
            <div className="space-y-1">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-gray-900">{cert.name}</h3>
                    {cert.issuer && <p className="text-xs text-gray-700">{cert.issuer}</p>}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatDate(cert.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mb-3">
            <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
              ACHIEVEMENTS
            </h2>
            <div className="space-y-1">
              {data.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-blue-700">{achievement.title}:</h3>
                      {achievement.description && (
                        <p className="text-xs text-gray-800 ml-2">• {achievement.description}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 ml-2">
                      {formatDate(achievement.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div className="mb-3">
            <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-1">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xs text-blue-700">{edu.institution}</h3>
                      <p className="text-xs text-gray-800 italic">{edu.degree}</p>
                      {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      <div>{formatDateRange(edu.startDate, edu.endDate)}</div>
                      {edu.gpa && <div>CGPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-3">
            <h2 className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide border-b border-gray-400 pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-2">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-xs text-blue-700">{exp.company}</h3>
                      <p className="text-xs text-gray-800 italic">{exp.jobTitle}</p>
                      {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="ml-2">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="text-xs text-gray-800 mb-1">• {line}</p>
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

export default ResumePreview;