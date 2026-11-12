import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
    </div>
  );
}
