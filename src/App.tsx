import { DashboardLayout } from "@/layout/DashboardLayout.tsx";

import { Routes, Route } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import AuthGuard from "./modules/auth/pages/AuthGuard";
import Dashboard from "./modules/dashboard/pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/"
          element={
            <DashboardLayout>
              <AuthGuard />
            </DashboardLayout>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
