import React, { useState } from "react";
import { AccountState } from "../../utils/AccountState";

const Forgot: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<AccountState>(
    AccountState.VALID
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      setEmailStatus(AccountState.VALID);
    } else {
      setEmailStatus(AccountState.INVALID_EMAIL);
    }
  };

  return (
    <>
      <div className="forgotpage">
        <div className="forgotpage_container">
          <div className="forgotpage_container_inner">
            <div className="forgotpage_container_inner_top">
              <div className="forgotpage_container_inner_top_logo">
                <img src="../src/assets/images/calendar.png"></img>
                <h2>Notan</h2>
              </div>
              <h2>Forgot password?</h2>
              <div className="forgotpage_container_inner_top_textbox">
                <p>
                  Enter your email address and we’ll send you a link to reset
                  your password.{" "}
                </p>
              </div>
            </div>

            <div className="forgotpage_container_inner_mid">
              <form onSubmit={(e) => false}>
                <section className="forgotpage_container_email_section">
                  <label>E-mail address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address.."
                    value={email}
                    onChange={handleEmailChange}
                  ></input>
                  {emailStatus !== AccountState.VALID && (
                    <p>
                      <span className="material-symbols-rounded">warning</span>
                      {AccountState.INVALID_EMAIL}
                    </p>
                  )}
                </section>

                <button type="submit">Send link</button>
                <a href="/login">Go back</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
