# Node.js MongoDB Template

A scalable and maintainable Node.js template with MongoDB integration, repository pattern, and testing infrastructure for a medical triage system.

## Features

- Modular architecture with clear separation of concerns
- Repository pattern for data access abstraction
- Mock repository for easier testing and development
- MongoDB integration with Mongoose ODM
- Express server with RESTful API
- Environment configuration for local and AWS deployment
- Error handling middleware
- Testing infrastructure with Jest

## Project Structure

```
/
├── config/              # Configuration files
│   └── db.js           # Database connection
├── controllers/         # Request handlers
│   ├── nurseController.js
│   ├── patientController.js
│   ├── quizResultController.js
│   ├── triageController.js
│   └── vitalsController.js
├── entities/           # Business entities
│   ├── baseEntity.js
│   ├── nurseEntity.js
│   ├── patientEntity.js
│   ├── quizResultEntity.js
│   ├── triageEntity.js
│   └── vitalsEntity.js
├── middleware/         # Express middleware
│   └── errorHandler.js
├── models/            # Mongoose models
│   ├── nurseModel.js
│   ├── patientModel.js
│   ├── quizResultModel.js
│   ├── triageModel.js
│   └── vitalsModel.js
├── repositories/      # Data access layer
│   ├── baseRepository.js
│   ├── mockRepository.js
│   ├── nurseRepository.js
│   ├── patientRepository.js
│   ├── quizResultRepository.js
│   ├── triageRepository.js
│   └── vitalsRepository.js
├── routes/           # API routes
│   ├── index.js
│   ├── nurseRoutes.js
│   ├── patientRoutes.js
│   ├── quizResultRoutes.js
│   ├── triageRoutes.js
│   └── vitalsRoutes.js
├── tests/           # Tests
│   ├── setup.js
│   └── routes.test.js
├── utils/           # Utility functions
│   └── apiResponse.js
├── .env            # Environment variables
├── package.json    # Dependencies
├── README.md       # Documentation
└── server.js       # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create a new patient

### Vitals
- `GET /api/vitals/:id` - Get vitals by ID
- `POST /api/vitals` - Create vitals
- `PUT /api/vitals/:id` - Update vitals

### Quiz Results
- `GET /api/quiz-results/:id` - Get quiz result by ID
- `POST /api/quiz-results` - Create quiz result

### Triage
- `GET /api/triage/:id` - Get triage by ID
- `POST /api/triage` - Create triage
- `PUT /api/triage/:id` - Update triage
- `GET /api/triage/pending` - Get pending triages
- `GET /api/triage/result/:id` - Get triage result
- `POST /api/triage/release/:patientId` - Release patient from triage

### Nurses
- `GET /api/nurses/:id` - Get nurse by ID
- `POST /api/nurses` - Create nurse
- `PUT /api/nurses/:id` - Update nurse

## Data Models

### Patient
- `id` (uuid/string)
- `cpf` (string)
- `name` (string)
- `dateOfBirth` (timestamp)

### Vitals
- `id` (uuid/string)
- `patientId` (uuid/string)
- `temperature` (number - °C)
- `heartRate` (number - beats per minute)
- `oxygenSaturation` (number - % SpO2)
- `systolicPressure` (number - mmHg)
- `diastolicPressure` (number - mmHg)
- `weight` (number - kg)

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

Run tests with:

```bash
npm test
```

## Deployment

This template is designed to be AWS-ready. For deployment:

1. Set environment variables for production
2. Build the application
3. Deploy to AWS (EC2, ECS, Lambda, etc.)

## License

This project is licensed under the MIT License.