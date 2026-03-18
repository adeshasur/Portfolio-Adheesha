import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteShell() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid bg-[size:100px_100px] opacity-20" />
      <div className="relative z-10">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
