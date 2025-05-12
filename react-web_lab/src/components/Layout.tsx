import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="tm-80">
        <Outlet />
      </main>
    </>
  )
}
