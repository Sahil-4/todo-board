import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import Home from "./pages/home";
import Error from "./pages/error";
import Auth from "./pages/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
      <ErrorModal />
    </AppProvider>
  );
}

export default App;
