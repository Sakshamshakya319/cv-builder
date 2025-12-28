import express from 'express';
import CV from '../models/CV.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Create or update CV
router.post('/save', upload.single('profileImage'), async (req, res) => {
  try {
    const cvData = JSON.parse(req.body.cvData);
    
    // Convert image to base64 if uploaded
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      cvData.personalInfo.profileImage = base64Image;
    }

    const existingCV = await CV.findOne({ 
      userId: cvData.userId, 
      type: cvData.type 
    });

    let cv;
    if (existingCV) {
      cv = await CV.findByIdAndUpdate(existingCV._id, cvData, { new: true });
    } else {
      cv = new CV(cvData);
      await cv.save();
    }

    res.status(200).json({ 
      message: 'CV saved successfully', 
      cvId: cv._id,
      cv: cv 
    });
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(500).json({ message: 'Error saving CV', error: error.message });
  }
});

// Get CV by ID
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CV', error: error.message });
  }
});

// Get user's CVs
router.get('/user/:userId', async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.params.userId });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CVs', error: error.message });
  }
});

// Mark CV as downloaded
router.patch('/:id/downloaded', async (req, res) => {
  try {
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { 
        isDownloaded: true,
        downloadedAt: new Date()
      },
      { new: true }
    );
    
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    
    res.status(200).json({ message: 'CV marked as downloaded', cv });
  } catch (error) {
    res.status(500).json({ message: 'Error updating CV', error: error.message });
  }
});

// Delete CV
router.delete('/:id', async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.status(200).json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting CV', error: error.message });
  }
});

export default router;