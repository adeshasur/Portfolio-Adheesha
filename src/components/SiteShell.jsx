import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteShell() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
