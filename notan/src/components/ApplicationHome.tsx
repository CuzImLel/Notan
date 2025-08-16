import React, { useEffect, useState } from "react";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationNavbar from "./ApplicationNavbar";
import Menu from "../utils/Menu";
import ApplicationWorkspace from "./ApplicationWorkspace";
import { CalendarEvent } from "../utils/Event";
import { Priority } from "../utils/Priority";
import { State } from "../utils/State";
import axios from "axios";
import { parseEventsToObjects } from "../utils/helpers/EventHandler";
import EventCreatingModal from "./EventCreatingModal";
import { GradeCalculationPiece } from "../utils/GradeCalculationPiece";

interface props {
  data: { _id: string; email: string; username: string } | null;
  setLogin: (login: boolean) => void;
}

const ApplicationHome: React.FC<props> = ({ data, setLogin }) => {
  const [menu, setMenu] = useState<Menu>(Menu.DASHBOARD);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [gradeData, setGradeData] = useState<GradeCalculationPiece[]>([]);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/events", {
        params: { userid: data?._id },
      })
      .then((res) => {
        setEvents(parseEventsToObjects(res));
        console.log("Successfully pulled all events:", res.data);
      })
      .catch((err) => {
        console.error(
          "An error occured while trying to fetch all events:",
          err.message
        );
      });
  };

  const refreshEvents = () => {
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {data ? (
        <>
          <div className="application_container">
            <ApplicationSidebar
              menu={menu}
              setMenu={setMenu}
              setLogin={setLogin}
              user={data}
            ></ApplicationSidebar>

            <section className="application_content_container">
              <ApplicationNavbar
                currentMenu={menu}
                user={data}
                refreshEventData={refreshEvents}
              ></ApplicationNavbar>
              <ApplicationWorkspace
                menu={menu}
                events={events}
                refreshEventData={refreshEvents}
              ></ApplicationWorkspace>
            </section>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default ApplicationHome;
