

















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
<!-- ## Features

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
- View all quizzes in a dashboard
- View quiz details in read-only mode
- Delete quizzes
- Backend validation with Zod
- PostgreSQL database with Prisma ORM
- Environment-based configuration
- Responsive UI

## Project Structure

```text
quiz-builder/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── prisma.config.ts
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md -->