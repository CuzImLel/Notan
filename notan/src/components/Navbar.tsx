import React from "react";
import { useNavigate } from "react-router-dom";

interface props {}

const Navbar: React.FC<props> = () => {
  const navigate: any = useNavigate();
  return (
    <>
      <div className="navigationbar_container">
        <div className="navigationbar_inner_container">
          <div className="navigationbar_left_container">
            <span>
              <img src="../src/assets/images/calendar.png"></img>
            </span>
            <h1>Notan</h1>
          </div>
          <div className="navigationbar_mid_container">
            <ul>
              <li>
                <p>Features</p>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </li>
              <li>
                <p>Versions</p>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </li>
              <li>
                <p>Solutions</p>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </li>
              <li>
                <p>Developers</p>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </li>
              <li>
                <p>Ressources</p>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </li>
            </ul>
          </div>
          <div className="navigationbar_right_container">
            <a href="https://github.com/CuzImLel/Notan">View Sourcecode</a>
            <button
              className="navigationbar_loginbutton"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="navigationbar_signupbutton"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
