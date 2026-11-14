import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Modal from "../Components/Modal";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <Modal />
    </div>
  );
}
