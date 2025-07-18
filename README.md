# IMPACT - Integrated Monitoring, Analysis, and Prediction of Environmental Sustainability

A comprehensive web application for real-time environmental monitoring, data analysis, and predictive modeling at National Taipei University. This project provides an advanced dashboard for tracking various environmental parameters and predicting future trends using multiple machine learning models.

## 🌟 Features

### Real-time Environmental Monitoring

- **Multi-parameter Sensing**: Temperature, pH, conductivity, oxygen levels, PPM, and PM2.5
- **Live Data Visualization**: Interactive charts and graphs with real-time updates
- **Sensor Status Indicators**: Visual indicators for environmental parameter status
- **WebSocket Integration**: Real-time data streaming for instant updates

### Advanced Analytics

- **Historical Data Analysis**: Comprehensive data visualization with customizable time ranges
- **Box Plot Charts**: Statistical analysis of environmental parameters
- **Trend Analysis**: Identify patterns and correlations in environmental data
- **Data Export**: Export historical data for further analysis

### Machine Learning Predictions

- **Multiple AI Models**:
  - LSTM (Long Short-Term Memory)
  - GRU (Gated Recurrent Unit)
  - CNN-LSTM (Convolutional Neural Network + LSTM)
  - CNN-GRU (Convolutional Neural Network + GRU)
  - Transformer
  - Ensemble Models
- **Predictive Analytics**: Forecast future environmental conditions
- **Model Comparison**: Compare predictions across different AI models
- **Real-time Predictions**: Live prediction updates

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Multi-language Support**: English and Chinese (Traditional) localization
- **Modern UI**: Built with HeroUI and Tailwind CSS for a clean, professional interface

## 🏗️ Architecture

### Frontend (`impact-webpage-frontend/`)

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with HeroUI components
- **State Management**: React Query for server state
- **Real-time Communication**: Socket.IO client
- **Internationalization**: next-intl for multi-language support
- **Charts**: Chart.js with React Chart.js 2
- **TypeScript**: Full type safety

### Backend (`impact-webpage-backend/`)

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time Communication**: Socket.IO server
- **API**: RESTful endpoints for data retrieval and analysis
- **Validation**: Yup schema validation
- **TypeScript**: Full type safety

### Data Models

- **Sensor Data**: Real-time environmental measurements
- **Prediction Models**: Multiple AI model predictions
- **Historical Data**: Time-series environmental data

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/geoffreyfarrel/newImpact-webpage.git
   cd newImpact-webpage
   ```

2. **Backend Setup**

   ```bash
   cd impact-webpage-backend
   npm install

   # Create .env file with your configuration
   cp .env.example .env

   # Start development server
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd impact-webpage-frontend
   npm install

   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5010
   - Backend API: http://localhost:3000

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb://<dbURL:PORT>/impact-db

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5010
```

## 📁 Project Structure

```
newImpact-webpage/
├── impact-webpage-backend/          # Backend API server
│   ├── src/
│   │   ├── controllers/            # API controllers
│   │   ├── models/                 # Database models
│   │   ├── routes/                 # API routes
│   │   ├── utils/                  # Utility functions
│   │   └── index.ts               # Server entry point
│   ├── package.json
│   └── Dockerfile
├── impact-webpage-frontend/         # Frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Next.js pages
│   │   ├── services/               # API services
│   │   ├── types/                  # TypeScript types
│   │   └── utils/                  # Utility functions
│   ├── public/                     # Static assets
│   ├── package.json
│   └── Dockerfile
└── README.md
```

## 🎯 Key Pages

- **Home**: Real-time sensor data and latest predictions
- **Analysis**: Historical data analysis with interactive charts
- **Prediction**: AI model predictions and comparison
- **All Results**: Comprehensive data table with filtering
- **About**: Project information and team details

## 🔧 Development

### Available Scripts

**Backend:**

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server
```

**Frontend:**

```bash
npm run dev          # Start development server (port 5010)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Docker Deployment

Both frontend and backend include Dockerfile for containerized deployment:

```bash
# Build and run backend
cd impact-webpage-backend
docker build -t impact-backend .
docker run -p 3000:3000 impact-backend

# Build and run frontend
cd impact-webpage-frontend
docker build -t impact-frontend .
docker run -p 5010:5010 impact-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Technologies Used

### Frontend

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **HeroUI** - Component library
- **Chart.js** - Data visualization
- **Socket.IO** - Real-time communication
- **React Query** - Server state management
- **next-intl** - Internationalization

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time communication
- **TypeScript** - Type safety
- **Yup** - Schema validation

## 📈 Machine Learning Models

The system integrates multiple AI models for environmental prediction:

- **LSTM**: Long Short-Term Memory networks for time series prediction
- **GRU**: Gated Recurrent Units for efficient sequence modeling
- **CNN-LSTM**: Convolutional + LSTM hybrid for spatial-temporal patterns
- **CNN-GRU**: Convolutional + GRU hybrid for enhanced feature extraction
- **Transformer**: Attention-based models for complex pattern recognition
- **Ensemble**: Combined predictions from multiple models

## 🏛️ Project Information

This project is part of the **Integrated Monitoring, Analysis, and Prediction of Environmental Sustainability** initiative at National Taipei University.

### Lead Institution

- **National Taipei University (NTPU)**
- Department of Computer Science and Information Engineering

### Project Sponsor

- **Honhui Technology**

### Project Team

- **Project Leader**: Dr. Yue-Shan Chang (Distinguished Professor, CSIE)
- **Project Assistant**: Cheng-Han Zhan
- **Team Members**: Geoffrey Farrel, Wen-Jun Huang, Ellen Asyana Gani, Vincent Nyoman

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For questions or support, please contact the project team at National Taipei University.

---

**IMPACT** - Empowering environmental sustainability through intelligent monitoring and prediction.
