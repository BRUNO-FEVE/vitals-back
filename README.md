# Node.js MongoDB Template

A scalable and maintainable Node.js template with MongoDB integration, repository pattern, and testing infrastructure.

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
│   └── db.js            # Database connection
├── controllers/         # Request handlers
│   └── userController.js
├── entities/            # Business entities
│   ├── baseEntity.js
│   └── userEntity.js
├── middleware/          # Express middleware
│   └── errorHandler.js
├── models/              # Mongoose models
│   └── userModel.js
├── repositories/        # Data access layer
│   ├── baseRepository.js
│   ├── mockRepository.js
│   └── userRepository.js
├── routes/              # API routes
│   ├── index.js
│   └── userRoutes.js
├── tests/               # Tests
│   ├── setup.js
│   └── routes.test.js
├── utils/               # Utility functions
│   └── apiResponse.js
├── .env                 # Environment variables
├── package.json         # Dependencies
├── README.md            # Documentation
└── server.js            # Application entry point
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

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

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