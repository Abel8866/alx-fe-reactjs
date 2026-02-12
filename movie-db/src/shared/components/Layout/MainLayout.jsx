import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Outlet />
      </div>
    </div>
  );
}
