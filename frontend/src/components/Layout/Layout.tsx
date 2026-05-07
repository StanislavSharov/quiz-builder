import { Link, NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/quizzes" className="logo">
          Quiz Builder
        </Link>

        <nav className="nav">
          <NavLink
            to="/quizzes"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Quizzes
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Create Quiz
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}