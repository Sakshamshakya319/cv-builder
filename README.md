# CV Generator

A modern, full-stack CV/Resume generator built with React.js, Node.js, Vite, Tailwind CSS, and MongoDB.

## Features

- **Dual Templates**: Choose between CV and Resume formats
- **Real-time Preview**: See changes instantly as you edit
- **Image Upload**: Add profile pictures to your documents
- **PDF Export**: Download your CV/Resume as PDF
- **Auto-cleanup**: Documents are automatically deleted 24 hours after download
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- html2canvas & jsPDF (PDF generation)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (File uploads)
- CORS enabled
- Environment variables with dotenv

## Project Structure

```
cv-generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CVBuilder.jsx
│   │   │   ├── CVForm.jsx
│   │   │   ├── CVPreview.jsx
│   │   │   └── ResumePreview.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/
│   │   └── CV.js
│   ├── routes/
│   │   ├── cvRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── package.json           # Root package.json
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cv-generator
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   - The MongoDB connection string is already configured in `server/.env`
   - Update other environment variables as needed

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on `http://localhost:5173`
   - Backend on `http://localhost:5000`

## Usage

1. **Choose Template**: Select between CV or Resume format
2. **Fill Information**: Use the form sections to add your details:
   - Personal Information (with image upload)
   - Professional Summary
   - Work Experience
   - Education
   - Skills (Technical, Languages, Frameworks, Tools, Soft Skills)
   - Projects
   - Certifications
   - Achievements

3. **Live Preview**: See real-time updates in the preview panel
4. **Save**: Save your progress to the database
5. **Download**: Export as PDF (automatically marks for cleanup)

## Key Features

### Form Sections
- **Personal Info**: Name, contact details, social links, profile image
- **Summary**: Professional summary/objective
- **Experience**: Work history with descriptions
- **Education**: Academic background
- **Skills**: Categorized technical and soft skills
- **Projects**: Personal/professional projects with links
- **Certifications**: Professional certifications
- **Achievements**: Awards and accomplishments

### Templates
- **CV Template**: Formal layout with blue accents and structured sections
- **Resume Template**: Compact, professional format optimized for ATS

### Data Management
- Temporary user IDs for session management
- Auto-deletion of downloaded documents after 24 hours
- Image storage as base64 in MongoDB
- Form validation and error handling

## API Endpoints

### CV Routes (`/api/cv`)
- `POST /save` - Save/update CV data
- `GET /:id` - Get CV by ID
- `GET /user/:userId` - Get user's CVs
- `PATCH /:id/downloaded` - Mark CV as downloaded
- `DELETE /:id` - Delete CV

### User Routes (`/api/users`)
- `POST /generate-id` - Generate temporary user ID

## Environment Variables

```env
MONGODB_URI=mongodb+srv://sakshamshakya319:dkML8Oi94v6p1a1L@cv-builder.u2s7qhl.mongodb.net/?appName=CV-Builder
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Development Scripts

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only frontend
npm run client

# Start only backend
npm run server

# Build frontend for production
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.