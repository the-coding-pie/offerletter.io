import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
const Home = lazy(() => import("./pages/Home"));
const TemplateDetail = lazy(() => import("./pages/TemplateDetail"));
const Error = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "template/:id",
        element: <TemplateDetail />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
