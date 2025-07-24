import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import ProtectedRoute from "../routes/ProtectedRoute";
import LogoLoader from "../components/loaders/LogoLoader";

// Test Pages
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const StaffMenuLayout = lazy(() => import("../layout/StaffMenuLayout"));
const StaffKitchenLayout = lazy(() => import("../layout/StaffKitchenLayout"));

function AppRoutes() {
  return (
    <>
      <Suspense fallback={<LogoLoader />}>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />
          {/* Custom 404 Page */}
          <Route path="*" element={<Notfound />} />

          {/* Admin Page */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/*Staff Menu Page */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute requiredRole="staff_menu">
                <StaffMenuLayout />
              </ProtectedRoute>
            }
          />

          {/* Staff Kitchen Page */}
          <Route
            path="/kitchen"
            element={
              <ProtectedRoute requiredRole="staff_kitchen">
                <StaffKitchenLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
