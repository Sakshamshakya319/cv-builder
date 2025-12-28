import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['cv', 'resume'],
    required: true
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    profileImage: { type: String }
  },
  summary: {
    type: String
  },
  experience: [{
    jobTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    location: { type: String },
    startDate: { type: String, default: '' },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String }
  }],
  education: [{
    degree: { type: String, default: '' },
    institution: { type: String, default: '' },
    location: { type: String },
    startDate: { type: String, default: '' },
    endDate: { type: String },
    gpa: { type: String }
  }],
  skills: {
    technical: [{ type: String }],
    languages: [{ type: String }],
    frameworks: [{ type: String }],
    tools: [{ type: String }],
    soft: [{ type: String }]
  },
  projects: [{
    title: { type: String, default: '' },
    description: { type: String },
    technologies: [{ type: String }],
    startDate: { type: String },
    endDate: { type: String },
    url: { type: String },
    github: { type: String }
  }],
  certifications: [{
    name: { type: String, default: '' },
    issuer: { type: String },
    date: { type: String },
    url: { type: String }
  }],
  achievements: [{
    title: { type: String, default: '' },
    description: { type: String },
    date: { type: String }
  }],
  isDownloaded: {
    type: Boolean,
    default: false
  },
  downloadedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Auto-delete after 24 hours if downloaded
cvSchema.index({ downloadedAt: 1 }, { 
  expireAfterSeconds: 86400,
  partialFilterExpression: { isDownloaded: true }
});

export default mongoose.model('CV', cvSchema);