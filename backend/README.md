# Telemedicine Backend

Node.js backend server for the Telemedicine Platform.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables in `.env`

3. Start the server:
\`\`\`bash
npm start
\`\`\`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase private key
- `FIREBASE_CLIENT_EMAIL` - Firebase client email
- `HUGGINGFACE_API_KEY` - Hugging Face API key

## Features

- RESTful API endpoints
- Firebase authentication
- File upload handling
- AI integration with Hugging Face
- Real-time Socket.IO communication
- Medicine inventory management
- Health record analysis
