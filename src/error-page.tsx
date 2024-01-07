import { useRouteError } from "react-router-dom";

export default function () {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold leading-tight">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-[#818181]">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}