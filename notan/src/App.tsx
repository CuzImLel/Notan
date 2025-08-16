import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import ApplicationHome from "./components/ApplicationHome";
import axios from "axios";
import UserData from "./utils/UserData";
import Forgot from "./components/pages/Forgot";

const App: React.FC = () => {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [userdata, setUserData] = useState<UserData | null>(null);

  const checkForToken = (): void => {
    const token = Cookies.get("Notan-Auth");

    if (token) {
      setLogin(true);

      axios
        .get("http://localhost:8080/auth/me", { withCredentials: true })
        .then((res) => {
          console.log("Logged in user:", res.data.user.username);
          setUserData(res.data.user);
        })
        .catch((err) => {
          console.log("Not logged in", err);
          setLogin(false);
        });
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);

  const login = () => {
    checkForToken();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn && userdata != null ? (
              <ApplicationHome data={userdata} setLogin={setLogin} />
            ) : (
              <Home />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Forgot />}
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Login login={login} />
          }
        />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" replace /> : <SignUp />}
        />
      </Routes>
    </Router>
  );
};

export default App;
