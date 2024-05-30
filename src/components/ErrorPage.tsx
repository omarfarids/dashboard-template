// src/components/ErrorPage.tsx
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center m-40">
      <h1 className="font-bold text-3xl mb-5">Oops!</h1>
      <p className="font-bold">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
