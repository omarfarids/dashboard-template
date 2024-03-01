import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main className="h-screen w-screen flex flex-row">
      <div className="w-1/3  h-full bg-[#494E67] hidden md:flex justify-center items-center">
        <div className="text-white text-3xl">Logo</div>
      </div>
      <div className="flex justify-center items-center w-full md:w-2/3">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
