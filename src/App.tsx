import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <ToastContainer
        autoClose={3000}
        closeOnClick={true}
        pauseOnHover={true}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
