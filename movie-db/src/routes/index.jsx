import { Routes, Route, Navigate } from "react-router-dom";
import MoviesListPage from "../features/movies/pages/MoviesListPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies" replace />} />
      <Route path="/movies" element={<MoviesListPage />} />
      <Route path="*" element={<div className="p-6">Not found</div>} />
    </Routes>
  );
}