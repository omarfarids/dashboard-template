import { Outlet } from "react-router-dom";
import logo from "@/assets/logoo.jpeg";

const App = () => {
  return (
    <main>
      <header className="relative flex flex-row justify-center items-center p-6">
        <img src={logo} alt="logo" className="w-[50px] h-[50px]" />
        {/* <ToggleTheme /> */}
      </header>

      <div className="h-[80vh] flex justify-center items-center p-5">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
