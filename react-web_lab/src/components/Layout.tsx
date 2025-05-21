import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

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
