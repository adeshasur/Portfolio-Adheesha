import { Navigate, Route, Routes } from "react-router-dom";
import SiteShell from "./components/SiteShell";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      </Route>
    </Routes>
  );
}
