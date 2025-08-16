import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountState } from "../../utils/AccountState";
import ErrorCard from "../ErrorCard";

interface props {
  login: () => void;
}

const Login: React.FC<props> = ({ login }) => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<AccountState>(
    AccountState.VALID
  );
  const [passwordStatus, setPasswordStatus] = useState<AccountState>(
    AccountState.VALID
  );
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    if (validated() == AccountState.VALID) {
      axios
        .post(
          "http://localhost:8080/auth/login",
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("Successfully logged in!");
          login();
          navigate("/");
        })
        .catch((err: any) => {
          displayError(err.message);
        });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      setEmailStatus(AccountState.VALID);
    } else {
      setEmailStatus(AccountState.INVALID_EMAIL);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 1) {
      setPasswordStatus(AccountState.VALID);
    } else {
      setPasswordStatus(AccountState.INVALID_PASSWORD);
    }
  };

  const displayError = (message: string): void => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const validated = (): AccountState => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailStatus(AccountState.INVALID_EMAIL);
      return AccountState.INVALID_EMAIL;
    }

    if (password.length < 1) {
      setPasswordStatus(AccountState.INVALID_PASSWORD);
      return AccountState.INVALID_PASSWORD;
    }

    setEmailStatus(AccountState.VALID);
    setPasswordStatus(AccountState.VALID);
    return AccountState.VALID;
  };

  return (
    <>
      <div className="loginpage">
        <div className="loginpage_container">
          <div className="loginpage_container_inner">
            <div className="loginpage_container_inner_top">
              <div className="loginpage_container_inner_top_logo">
                <img src="../src/assets/images/calendar.png"></img>
                <h2>Notan</h2>
              </div>
              <h2>Welcome back</h2>
              <div className="loginpage_container_inner_top_signup_referation">
                <p>New to Notan?</p>
                <a href="./signup">Sign up</a>
              </div>
            </div>

            <div className="loginpage_container_inner_mid">
              <form onSubmit={(e) => handleSubmit(e)}>
                <section className="loginpage_container_email_section">
                  <label>E-mail address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address.."
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                  ></input>
                  {emailStatus !== AccountState.VALID && (
                    <p>
                      <span className="material-symbols-rounded">warning</span>
                      {AccountState.INVALID_EMAIL}
                    </p>
                  )}
                </section>
                <section className="loginpage_container_password_section">
                  <div className="loginpage_container_password_section_top">
                    <label>Password</label>
                    <a href="./forgot-password">Forgot?</a>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password.."
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                  ></input>
                  {passwordStatus !== AccountState.VALID && (
                    <p>
                      <span className="material-symbols-rounded">warning</span>
                      {"A password is required."}
                    </p>
                  )}
                </section>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
        {error == "" ? "" : <ErrorCard errorMessage={error}></ErrorCard>}
      </div>
    </>
  );
};

export default Login;
