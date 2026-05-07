# Quiz Builder

A full-stack Quiz Builder application where users can create quizzes with multiple question types, view all quizzes, view quiz details in read-only mode, and delete quizzes.

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- CORS
- dotenv

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Axios
- CSS

## Features

- Create a quiz with a title and multiple questions
- Support different question types:
  - Boolean
  - Input
  - Checkbox
- Dynamically add and remove questions
- Add and remove checkbox options
- Manage form state with React Hook Form
- Fetch, cache, create, and delete quizzes with TanStack Query
- View all quizzes in a dashboard
- View quiz details in read-only mode
- Delete quizzes
- Backend validation with Zod
- Backend domain models and mappers for consistent API responses
- PostgreSQL database with Prisma ORM
- Environment-based configuration
- Responsive UI

## Project Structure

```text
quiz-builder/
├── backend/
│   ├── prisma/
│   │   └── postgres/
│   │       ├── schema.prisma
│   │       ├── models/
│   │       │   ├── quiz.prisma
│   │       │   ├── question.prisma
│   │       │   └── option.prisma
│   │       └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── domain/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   ├── postgres-prisma.config.ts
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── queryKeys.ts
│   │   │   └── quizzesApi.ts
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Layout/
│   │   │   ├── QuestionFields/
│   │   │   ├── QuizCard/
│   │   │   └── QuizForm/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── config.ts
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- PostgreSQL

## Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
POSTGRES_DATABASE_URL="postgresql://postgres:your_password@localhost:5432/quiz_builder"
PORT=5000
CLIENT_URL="http://localhost:5173"
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL="http://localhost:5000/api"
```

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE quiz_builder;
```

Then run Prisma commands from the `backend` directory:

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
```

## How to Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

Health check endpoint:

```text
GET http://localhost:5000/health
```

## How to Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

### Create Quiz

```text
POST /api/quizzes
```

Example request body:

```json
{
  "title": "JavaScript Basics",
  "questions": [
    {
      "text": "JavaScript is a programming language.",
      "type": "BOOLEAN",
      "options": [
        {
          "text": "True",
          "isCorrect": true
        },
        {
          "text": "False",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What keyword is used to declare a constant?",
      "type": "INPUT",
      "options": []
    },
    {
      "text": "Which of these are JavaScript libraries or frameworks?",
      "type": "CHECKBOX",
      "options": [
        {
          "text": "React",
          "isCorrect": true
        },
        {
          "text": "Vue",
          "isCorrect": true
        },
        {
          "text": "Laravel",
          "isCorrect": false
        }
      ]
    }
  ]
}
```

### Get All Quizzes

```text
GET /api/quizzes
```

Returns a list of quizzes with their titles and question counts.

### Get Quiz by ID

```text
GET /api/quizzes/:id
```

Returns full quiz details, including all questions and options.

### Delete Quiz

```text
DELETE /api/quizzes/:id
```

Deletes a quiz from the database.

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the backend in development mode.

```bash
npm run build
```

Builds the backend TypeScript code.

```bash
npm run start
```

Starts the compiled backend from the `dist` directory.

```bash
npm run prisma:generate
```

Generates Prisma Client using `postgres-prisma.config.ts`.

```bash
npm run prisma:migrate
```

Runs Prisma migrations using `postgres-prisma.config.ts`.

```bash
npm run prisma:studio
```

Opens Prisma Studio using `postgres-prisma.config.ts`.

### Frontend

```bash
npm run dev
```

Starts the frontend development server.

```bash
npm run build
```

Runs TypeScript checks and builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

## Validation Rules

The backend validates quiz creation requests with Zod:

- Quiz title is required
- At least one question is required
- Question text is required
- Supported question types:
  - `BOOLEAN`
  - `INPUT`
  - `CHECKBOX`
- Boolean questions must have exactly two options
- Checkbox questions must have at least two options
- Checkbox questions must have at least one correct option
- Input questions should not have predefined options

## Notes

- `.env` files are not committed to the repository.
- `.env.example` files are included to show the required configuration.
- The quiz detail page displays questions in read-only mode according to the assessment requirements.