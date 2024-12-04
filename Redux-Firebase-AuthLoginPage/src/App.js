//import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import SignUp from "./pages/SignUp";
import LoggedInUserRootLayout from "./pages/LoggedInUserRootLayout";
import { useSelector } from "react-redux";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
