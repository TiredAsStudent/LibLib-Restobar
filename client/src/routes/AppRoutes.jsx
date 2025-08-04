import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../routes/ProtectedRoute";
import LogoLoader from "../components/loaders/LogoLoader";

import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import QRViewPage from "../pages/QRViewPage"; //New page also no data
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const StaffMenuLayout = lazy(() => import("../layout/StaffMenuLayout"));
const StaffKitchenLayout = lazy(() => import("../layout/StaffKitchenLayout"));

// New Pages no data
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Menu = lazy(() => import("../pages/admin/Menu"));
const Orders = lazy(() => import("../pages/admin/Orders"));
const QrManagement = lazy(() => import("../pages/admin/QrManagement"));
const Reports = lazy(() => import("../pages/admin/Reports"));
const Users = lazy(() => import("../pages/admin/Users"));

function AppRoutes() {
  return (
    <>
      <Suspense fallback={<LogoLoader />}>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />
          {/* Qr Page */}
          <Route path="/qr/pay/:tableId" element={<QRViewPage />} />
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
          >
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<Menu />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="qr-management" element={<QrManagement />} />
          </Route>

          {/*Staff Menu Page */}
          <Route
            path="/staff/menu"
            element={
              <ProtectedRoute requiredRole="staff_menu">
                <StaffMenuLayout />
              </ProtectedRoute>
            }
          />

          {/* Staff Kitchen Page */}
          <Route
            path="/staff/kitchen"
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
