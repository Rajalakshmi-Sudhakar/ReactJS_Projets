import Counter from "./components/Counter";
import { Fragment } from "react";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import Auth from "./components/Auth";
import { authActions } from "./store/auth";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  return (
    <Fragment>
      <Header onHandleLogout={handleLogout} />
      {!isAuth && <Auth onHandleLogin={handleLogin} />}
      {isAuth && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
