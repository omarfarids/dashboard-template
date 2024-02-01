import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <header className="relative flex flex-row justify-center items-center p-6">
        Logo
        {/* <ToggleTheme /> */}
      </header>

      <div className="h-[80vh] flex justify-center items-center p-5">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
