import { Routes, Route, Navigate } from "react-router-dom";
// import MoviesListPage from "../features/movies/pages/MoviesListPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/movies" element={<MoviesListPage />} /> */}
      <Route path="/" element={<Navigate to="/movies" replace />} />
    </Routes>
  );
}