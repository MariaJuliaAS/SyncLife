import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from "react-hot-toast"
import PaymentProvider from "./context/paymentContext"

function App() {
  return (
    <>
      <Toaster
        position="bottom-center"
      />
      <PaymentProvider>
        <RouterProvider router={router} />
      </PaymentProvider>
    </>
  )
}

export default App
