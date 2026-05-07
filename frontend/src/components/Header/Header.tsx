import { Link, NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";

export function Header() {
  return (
    <header className="header">
      <Link to={APP_ROUTES.QUIZZES} className="logo">
        Quiz Builder
      </Link>

      <nav className="nav">
        <NavLink
          to={APP_ROUTES.QUIZZES}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Quizzes
        </NavLink>

        <NavLink
          to={APP_ROUTES.CREATE_QUIZ}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Create Quiz
        </NavLink>
      </nav>
    </header>
  );
}