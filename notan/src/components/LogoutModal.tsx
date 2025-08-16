import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface props {
  modalOperation: (open: boolean) => void;
  setLogin: (loggedIn: boolean) => void;
}

const LogoutModal: React.FC<props> = ({ modalOperation, setLogin }) => {
  const navigate = useNavigate();

  const logout = () => {
    modalOperation(false);
    setLogin(false);
    Cookies.remove("Notan-Auth");
    navigate("/login");
  };

  return (
    <>
      <div className="fullscreen_modal_logout">
        <div className="logout_modal">
          <span className="material-symbols-rounded">warning</span>
          <h1>Sign out</h1>
          <p>Are you sure you would like to sign out of your account?</p>
          <div className="logout_modal_button_section">
            <button className="logout_modal_signout_button" onClick={logout}>
              Sign out
            </button>
            <button
              className="logout_modal_cancel_button"
              onClick={() => modalOperation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
