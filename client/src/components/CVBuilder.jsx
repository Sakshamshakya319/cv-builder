import React, { useState, useRef, useEffect } from 'react';
import { FileText, User, Download, Save, Image, FileImage } from 'lucide-react';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import ResumePreview from './ResumePreview';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CVBuilder = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('cv');
  const [cvData, setCvData] = useState({
    userId,
    type: 'cv',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      linkedin: '',
      github: '',
      profileImage: null
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      languages: [],
      frameworks: [],
      tools: [],
      soft: []
    },
    projects: [],
    certifications: [],
    achievements: []
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [savedCvId, setSavedCvId] = useState(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const previewRef = useRef();
  const downloadMenuRef = useRef();

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDataChange = (newData) => {
    setCvData(prev => ({
      ...prev,
      ...newData,
      type: activeTab
    }));
  };

  const handleSave = async () => {
    // Basic validation - at least name should be provided
    if (!cvData.personalInfo.fullName.trim()) {
      alert('Please enter your full name before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      
      // Prepare CV data
      const dataToSave = {
        ...cvData,
        type: activeTab
      };
      
      formData.append('cvData', JSON.stringify(dataToSave));
      
      // Add profile image if exists
      if (cvData.personalInfo.profileImage && cvData.personalInfo.profileImage instanceof File) {
        formData.append('profileImage', cvData.personalInfo.profileImage);
      }

      const response = await axios.post('/api/cv/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSavedCvId(response.data.cvId);
      alert('CV saved successfully!');
    } catch (error) {
      console.error('Error saving CV:', error);
      alert('Error saving CV. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (format = 'pdf') => {
    if (!previewRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight
      });
      
      const fileName = `${activeTab}-${cvData.personalInfo.fullName || 'document'}`;
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm (297 - margins)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Only create multiple pages if content actually exceeds one page
        if (imgHeight <= pageHeight) {
          // Content fits on one page
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
          // Content needs multiple pages
          let heightLeft = imgHeight;
          let position = 0;
          
          // First page
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          
          // Additional pages only if needed
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
        }
        
        pdf.save(`${fileName}.pdf`);
      } else if (format === 'png') {
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else if (format === 'jpg') {
        const link = document.createElement('a');
        link.download = `${fileName}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
      }
      
      // Mark as downloaded in backend
      if (savedCvId) {
        await axios.patch(`/api/cv/${savedCvId}/downloaded`);
      }
      
      setShowDownloadMenu(false);
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Error downloading file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">CV Generator</h1>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('cv')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'cv'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CV Template
              </button>
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'resume'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Resume Template
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 relative">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-secondary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
              
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  disabled={isDownloading}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
                </button>
                
                {/* Download Menu */}
                {showDownloadMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download as PDF
                      </button>
                      <button
                        onClick={() => handleDownload('png')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Download as PNG
                      </button>
                      <button
                        onClick={() => handleDownload('jpg')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileImage className="h-4 w-4 mr-2" />
                        Download as JPG
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Your {activeTab === 'cv' ? 'CV' : 'Resume'}
              </h2>
            </div>
            <CVForm data={cvData} onChange={handleDataChange} />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Live Preview
            </h2>
            <div className="border rounded-lg overflow-hidden">
              <div ref={previewRef}>
                {activeTab === 'cv' ? (
                  <CVPreview data={cvData} />
                ) : (
                  <ResumePreview data={cvData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;