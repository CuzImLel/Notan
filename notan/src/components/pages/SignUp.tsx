import React, { useState } from "react";
import { AccountState } from "../../utils/AccountState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorCard from "../ErrorCard";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [emailStatus, setEmailStatus] = useState<AccountState>(
    AccountState.VALID
  );
  const [usernameStatus, setUsernameStatus] = useState<AccountState>(
    AccountState.VALID
  );
  const [passwordStatus, setPasswordStatus] = useState<AccountState>(
    AccountState.VALID
  );

  const registerUser = async (): Promise<any> => {
    axios
      .post("http://localhost:8080/auth/register", {
        email: email,
        password: password,
        username: username,
      })
      .then((res) => {
        console.log("Successfully added new User");
        navigate("/login");
      })
      .catch((err: any) => {
        displayError(err.response.data.message);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validated();
    if (validation === AccountState.VALID) {
      registerUser();
    }
  };

  const validated = (): AccountState => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!emailRegex.test(email)) {
      setEmailStatus(AccountState.INVALID_EMAIL);
      return AccountState.INVALID_EMAIL;
    }

    if (
      username.length < 3 ||
      /\s/.test(username) ||
      !usernameRegex.test(username)
    ) {
      setUsernameStatus(AccountState.INVALID_USERNAME);
      return AccountState.INVALID_USERNAME;
    }

    if (password.length < 8) {
      setPasswordStatus(AccountState.INVALID_PASSWORD);
      return AccountState.INVALID_PASSWORD;
    }

    setEmailStatus(AccountState.VALID);
    setUsernameStatus(AccountState.VALID);
    setPasswordStatus(AccountState.VALID);
    return AccountState.VALID;
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (
      e.target.value.length >= 3 &&
      !/\s/.test(e.target.value) &&
      usernameRegex.test(e.target.value)
    ) {
      setUsernameStatus(AccountState.VALID);
    } else {
      setUsernameStatus(AccountState.INVALID_USERNAME);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
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

  return (
    <div className="signuppage">
      <div className="signuppage_container">
        <div className="signuppage_container_inner">
          <div className="signuppage_container_inner_top">
            <div className="signuppage_container_inner_top_logo">
              <img src="../src/assets/images/calendar.png" alt="Logo" />
              <h2>Notan</h2>
            </div>
            <h2>Create account</h2>
            <div className="signuppage_container_inner_top_login_referation">
              <p>Already have an account?</p>
              <a href="./login">Login</a>
            </div>
          </div>

          <div className="signuppage_container_inner_mid">
            <form onSubmit={handleSubmit}>
              <section className="signuppage_container_email_section">
                <label htmlFor="email">E-mail address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address.."
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailStatus !== AccountState.VALID && (
                  <p>
                    <span className="material-symbols-rounded">warning</span>
                    {AccountState.INVALID_EMAIL}
                  </p>
                )}
              </section>

              <section className="signuppage_container_name_section">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name.."
                  value={username}
                  onChange={handleUsernameChange}
                />
                {usernameStatus !== AccountState.VALID && (
                  <p>
                    <span className="material-symbols-rounded">warning</span>
                    {AccountState.INVALID_USERNAME}
                  </p>
                )}
              </section>

              <section className="signuppage_container_password_section">
                <div className="signuppage_container_password_section_top">
                  <label htmlFor="password">Password</label>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password.."
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordStatus !== AccountState.VALID && (
                  <p>
                    <span className="material-symbols-rounded">warning</span>
                    {AccountState.INVALID_PASSWORD}
                  </p>
                )}
              </section>

              <button type="submit">Get started</button>
            </form>
          </div>
        </div>
      </div>
      {error == "" ? "" : <ErrorCard errorMessage={error}></ErrorCard>}
    </div>
  );
};

export default SignUp;
