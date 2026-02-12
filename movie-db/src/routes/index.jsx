import { Routes, Route, Navigate } from "react-router-dom";
import MoviesListPage from "../features/movies/pages/MoviesListPage";
import MovieDetailsPage from "../features/movies/pages/MovieDetailsPage";
import PeopleListPage from "../features/people/pages/PeopleListPage";
import PersonDetailsPage from "../features/people/pages/PersonDetailsPage";
import { paths } from "./paths";
import MainLayout from "../shared/components/Layout/MainLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={paths.home} element={<Navigate to={paths.movies} replace />} />

        <Route path={paths.movies} element={<MoviesListPage />} />
        <Route path={paths.movieDetails()} element={<MovieDetailsPage />} />

        <Route path={paths.people} element={<PeopleListPage />} />
        <Route path={paths.personDetails()} element={<PersonDetailsPage />} />

        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Route>
    </Routes>
  );
}
