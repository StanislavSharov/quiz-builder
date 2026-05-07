import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { CreateQuizPage } from "./pages/CreateQuizPage";
import { QuizDetailsPage } from "./pages/QuizDetailsPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { APP_ROUTES } from "./utils/constants";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path={APP_ROUTES.HOME}
          element={<Navigate to={APP_ROUTES.QUIZZES} replace />}
        />
        <Route path={APP_ROUTES.QUIZZES} element={<QuizzesPage />} />
        <Route path={APP_ROUTES.QUIZ_DETAILS} element={<QuizDetailsPage />} />
        <Route path={APP_ROUTES.CREATE_QUIZ} element={<CreateQuizPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.QUIZZES} replace />} />
      </Route>
    </Routes>
  );
}