// src/components/ErrorPage.tsx
import React from "react";
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center m-40">
      <h1 className="font-bold text-3xl mb-5">404!</h1>
      <p className="font-bold">Page not found.</p>
    </div>
  );
};

export default NotFound;
