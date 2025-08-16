import React, { useState } from "react";
import UserData from "../utils/UserData";
import Menu from "../utils/Menu";
import logo from "../assets/images/calendar.png";
import LogoutModal from "./LogoutModal";

interface props {
  menu: Menu;
  setMenu: (menu: Menu) => void;
  setLogin: (loggedIn: boolean) => void;
  user: UserData;
}

const ApplicationSidebar: React.FC<props> = ({
  menu,
  setMenu,
  setLogin,
  user,
}) => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  return (
    <>
      <div className="app_home_sidebar">
        <div className="app_home_sidebar_top">
          <div className="app_home_sidebar_top_logo">
            <img src={logo}></img>
            <h1>Notan</h1>
          </div>
        </div>
        <div className="app_home_sidebar_tool_container">
          <div className="app_home_sidebar_mid">
            <ul className="sidebar_list">
              <div>
                <li
                  className={
                    menu === Menu.DASHBOARD
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.DASHBOARD)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.DASHBOARD
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">grid_view</span>
                    <p className="sidebar_list_item_text">Dashboard</p>
                  </div>
                </li>
              </div>
              <div>
                <li
                  className={
                    menu === Menu.CALENDAR
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.CALENDAR)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.CALENDAR
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">
                      calendar_month
                    </span>
                    <p className="sidebar_list_item_text">Calendar</p>
                  </div>
                </li>
              </div>
              <div>
                <li
                  className={
                    menu === Menu.GRADES
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.GRADES)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.GRADES
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">functions</span>
                    <p className="sidebar_list_item_text">Operations</p>
                  </div>
                </li>
              </div>
              <div>
                <li
                  className={
                    menu === Menu.SCHEDULE
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.SCHEDULE)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.SCHEDULE
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">event</span>
                    <p className="sidebar_list_item_text">Schedule</p>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div className="app_sidebar_menu_sepperator">
            <span></span>
          </div>
          <div className="app_home_sidebar_mid_second">
            <ul>
              {" "}
              <div>
                <li
                  className={
                    menu === Menu.SETTINGS
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.SETTINGS)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.SETTINGS
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">settings</span>
                    <p className="sidebar_list_item_text">Settings</p>
                  </div>
                </li>
              </div>
              <div>
                <li
                  className={
                    menu === Menu.HELP
                      ? "sidebar_list_item_selected"
                      : "sidebar_list_item_unselected"
                  }
                  onClick={() => setMenu(Menu.HELP)}
                >
                  <div
                    className="sidebar_item_content"
                    id={
                      menu === Menu.HELP
                        ? "sidebar_selected"
                        : "sidebar_unselected"
                    }
                  >
                    <span className="material-symbols-rounded">help</span>
                    <p className="sidebar_list_item_text">Help</p>
                  </div>
                </li>
              </div>
              <div className="app_home_sidebar_bottom_logout">
                <li>
                  <div>
                    <button onClick={() => setLogoutModal(true)}>
                      <span className="material-symbols-rounded">logout</span>
                      <p className="sidebar_list_item_text">Logout</p>
                    </button>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div className="app_home_sidebar_bottom_section">
            <div className="app_home_sidebar_profilesection">
              <p className="app_home_sidebar_profilepic">
                {user.username.charAt(0).toUpperCase()}
              </p>
              <div className="app_home_sidebar_profilemetadata">
                <p>{user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {logoutModal ? (
        <LogoutModal
          modalOperation={setLogoutModal}
          setLogin={setLogin}
        ></LogoutModal>
      ) : (
        ""
      )}
    </>
  );
};

export default ApplicationSidebar;
