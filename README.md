# DSA Analyzer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)
![React](https://img.shields.io/badge/react-%5E18.0.0-blue)

An intelligent code analysis tool that evaluates Data Structures and Algorithms solutions, providing detailed feedback on code quality, complexity, and best practices.

## Features

- 🚀 Real-time code analysis
- 💡 AI-powered feedback using Google's Gemini
- 📊 Comprehensive metrics evaluation
- 🎨 Beautiful UI with syntax highlighting
- 🌗 Light/Dark theme support
- 🔒 Secure user authentication
- 📱 Responsive design

## Tech Stack

- **Frontend**: React, TailwindCSS, Monaco Editor
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI**: Google Gemini API
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- MongoDB
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dsa-analyzer.git
cd dsa-analyzer
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables:

Create `.env` in server directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_ORIGIN=http://localhost:5173
```

Create `.env` in client directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the application:

```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

The application will be available at: http://localhost:5173

## Usage

1. Create an account or log in
2. Navigate to the "Analyze" page
3. Select your programming language
4. Paste your DSA solution code
5. Add problem description/requirements
6. Click "Analyze" to get detailed feedback

## Analysis Metrics

- Problem Understanding
- Time Complexity
- Space Complexity
- Edge Cases Handling
- Code Structure
- Variable Naming
- Readability
- Algorithm Choice

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on the process for submitting pull requests.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

- Documentation: [Wiki](docs/wiki.md)
- Issues: [GitHub Issues](https://github.com/yourusername/dsa-analyzer/issues)
- Email: your.email@example.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Monaco Editor for the code editor component
- Google Gemini API for AI analysis
- TailwindCSS for styling