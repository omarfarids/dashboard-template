import { DashboardLayout } from "@/layout/DashboardLayout.tsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <>dashboard</>
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
