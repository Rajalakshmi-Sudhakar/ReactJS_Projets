import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function WelcomePage() {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>WelCome {user.username}!</h1>
    </>
  );
}
