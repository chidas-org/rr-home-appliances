import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "@/router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        style={{ zIndex: 9999 }}
        toastClassName="text-sm"
      />
    </>
  );
}