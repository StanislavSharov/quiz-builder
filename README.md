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
└── README.md