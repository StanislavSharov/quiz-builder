import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export function Layout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}