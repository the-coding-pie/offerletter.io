import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      <main className="flex-1 w-full flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default BaseLayout;
