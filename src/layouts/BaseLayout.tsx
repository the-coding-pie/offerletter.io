import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-lg z-40 flex items-center justify-between px-6">
        <Link to={`/`} className="font-semibold text-lg">
          Offer Letter.io
        </Link>

        <Link to={`/template/new-template`} className="btn primary text-sm flex items-center gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Template
        </Link>
      </header>
      <main className="flex-1 w-full flex flex-col mt-16">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default BaseLayout;
