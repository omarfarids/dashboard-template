import React from "react";
// import { ToggleTheme } from "@/components"; // Uncomment this line when ToggleTheme component is available
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <header className="relative flex flex-row justify-center items-center p-6 md:p-12">
        Logo
        {/* <ToggleTheme /> */}
      </header>

      <div className="h-[60vh] flex justify-center items-center p-5">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
