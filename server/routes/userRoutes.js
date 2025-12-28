import express from 'express';

const router = express.Router();

// Generate temporary user ID
router.post('/generate-id', (req, res) => {
  try {
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    res.status(200).json({ userId });
  } catch (error) {
    res.status(500).json({ message: 'Error generating user ID', error: error.message });
  }
});

export default router;