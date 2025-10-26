import React, { useState } from "react";
import UserData from "../utils/UserData";
import logo from "../assets/images/calendar.png";
import Menu from "../utils/Menu";
import EventCreatingModal from "./modals/EventCreatingModal";

interface props {
  user: UserData;
  currentMenu: Menu;
  refreshEventData: () => void;
}

const ApplicationNavbar: React.FC<props> = ({
  user,
  currentMenu,
  refreshEventData,
}) => {
  const [eventmodal, setEventModal] = useState<boolean>(false);
  return (
    <>
      {eventmodal ? (
        <EventCreatingModal
          user={user}
          closeModal={() => setEventModal(false)}
          refreshCalendar={refreshEventData}
        ></EventCreatingModal>
      ) : (
        ""
      )}
      <div className="app_home_navbar">
        <div className="app_home_navbar_container">
          <div className="app_home_navbar_left">
            <h1>{currentMenu}</h1>
          </div>

          <div className="app_home_navbar_right">
            {currentMenu === Menu.CALENDAR ? (
              <button
                className="add_event_button"
                onClick={() => setEventModal(true)}
              >
                Add Event*
              </button>
            ) : (
              ""
            )}

            <form className="app_home_navbar_right_searchbar">
              <input type="search" placeholder="Search..."></input>{" "}
              <button>
                <span className="material-symbols-rounded">search</span>
              </button>
            </form>

            <p className="navbar_sepperation_icon">|</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationNavbar;
