
# Vitals (Medical Triage System)

A backend application designed to support an intelligent medical triage system for healthcare environments. This system streamlines patient evaluation by managing patient data, vital signs, quiz-based assessments, and triage prioritization using a scalable Node.js architecture integrated with MongoDB.

## Features

- Modular architecture with clear separation of concerns
- Repository pattern for data access abstraction
- Mock repository for testing and development purposes
- MongoDB integration using Mongoose ODM
- RESTful API built with Express
- Environment configuration for local and cloud deployment
- Centralized error handling middleware
- Unit and integration testing with Jest

## Project Structure

```
/
├── config/              # Configuration files
│   └── db.js           # Database connection
├── controllers/         # API request handlers
├── entities/           # Domain entities
├── middleware/         # Express middleware
├── models/            # Mongoose models
├── repositories/      # Data access layer
├── routes/           # API routes
├── tests/            # Tests
├── utils/            # Utility functions
├── .env              # Environment variables
├── package.json      # Project metadata and dependencies
├── README.md         # Documentation
└── server.js         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values according to your environment

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Patients
- `GET /api/patients/:id` - Retrieve a patient by ID
- `POST /api/patients` - Register a new patient

### Vitals
- `GET /api/vitals/:id` - Retrieve vitals by ID
- `POST /api/vitals` - Record new vitals
- `PUT /api/vitals/:id` - Update existing vitals

### Quiz Results
- `GET /api/quiz-results/:id` - Retrieve a quiz result by ID
- `POST /api/quiz-results` - Record a new quiz result

### Triage
- `GET /api/triage/:id` - Retrieve triage by ID
- `POST /api/triage` - Create a triage record
- `PUT /api/triage/:id` - Update triage
- `GET /api/triage/pending` - Retrieve pending triages
- `GET /api/triage/result/:id` - Retrieve triage result
- `POST /api/triage/release/:patientId` - Release patient from triage

### Nurses
- `GET /api/nurses/:id` - Retrieve nurse by ID
- `POST /api/nurses` - Register a new nurse
- `PUT /api/nurses/:id` - Update nurse information

## Data Models

### Patient
- `id` (uuid/string)
- `cpf` (string)
- `name` (string)
- `dateOfBirth` (timestamp)

### Vitals
- `id` (uuid/string)
- `patientId` (uuid/string)
- `temperature` (number, °C)
- `heartRate` (number, bpm)
- `oxygenSaturation` (number, % SpO2)
- `systolicPressure` (number, mmHg)
- `diastolicPressure` (number, mmHg)
- `weight` (number, kg)

### Quiz Result
- `id` (uuid/string)
- `patientId` (uuid/string)
- `createdAt` (date)
- `quizType` (string)
- `answers` (string array)

### Triage
- `id` (uuid/string)
- `patientId` (uuid/string)
- `vitalsId` (uuid/string)
- `quizId` (uuid/string)
- `nurseId` (uuid/string)
- `notes` (string)
- `priorityNumber` (0-5)
- `state` (string)
- `createdAt` (date)

### Nurse
- `id` (uuid/string)
- `name` (string)
- `email` (string)
- `password` (string)

## Testing

Run all tests with:
```bash
npm test
```

## Deployment

This project is ready for deployment on AWS or similar platforms. Steps:

1. Set environment variables for production
2. Build the application
3. Deploy to your preferred environment (EC2, ECS, Lambda, etc.)

## License

This project is licensed under the MIT License.
