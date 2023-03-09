import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useModal from "./hooks/useModal";
import Modal from "./components/Modal/Modal";

const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
const Home = lazy(() => import("./pages/Home"));
const TemplateDetail = lazy(() => import("./pages/TemplateDetail"));
const CreateTemplate = lazy(() => import("./pages/CreateTemplate"));
const Error = lazy(() => import("./pages/Error"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      {
        path: "template/new-template",
        element: <CreateTemplate />,
      },
    ],
  },
]);

const App = () => {
  const { modal } = useModal();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer />

      {modal && <Modal {...modal} />}
    </>
  );
};

export default App;
