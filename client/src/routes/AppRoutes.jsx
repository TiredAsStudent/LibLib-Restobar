import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
