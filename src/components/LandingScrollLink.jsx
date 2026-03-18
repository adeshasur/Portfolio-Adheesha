import { useLocation, useNavigate } from "react-router-dom";

export default function LandingScrollLink({
  href,
  children,
  className = "",
  onClick,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const [pathname, hash = ""] = href.split("#");
    const targetPath = pathname || "/";
    const targetHash = hash ? `#${hash}` : "";

    event.preventDefault();

    if (location.pathname === targetPath) {
      if (!targetHash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) {
          window.history.replaceState(null, "", targetPath);
        }
        return;
      }

      const target = document.querySelector(targetHash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `${targetPath}${targetHash}`);
      }
      return;
    }

    navigate(`${targetPath}${targetHash}`);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
