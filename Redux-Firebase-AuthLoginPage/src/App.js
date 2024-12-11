//import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import SignUp from "./pages/SignUp";
import LoggedInUserRootLayout from "./components/LoggedInUserRootLayout";
import { useSelector } from "react-redux";
import GadgetPage from "./pages/GadgetPage";
import DashBoard from "./pages/DashBoard";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth.token);

  const authToken = token || localStorage.getItem("authToken");

  return authToken ? children : <Navigate to="/" />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },

    { path: "/signup", element: <SignUp /> },
    {
      path: "/welcome",
      element: (
        <ProtectedRoute>
          <LoggedInUserRootLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "dashboard",
          element: <DashBoard />,
        },
        {
          path: "gadget",
          element: <GadgetPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
