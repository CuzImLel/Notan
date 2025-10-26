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
import EventCreatingModal from "./modals/EventCreatingModal";
import { GradeCalculationPiece } from "../utils/GradeCalculationPiece";
import { SemesterTable } from "../utils/SemesterTable";
import { fetchEvents, fetchSemesterTables } from "../utils/helpers/ApiUtils";

interface props {
  data: { _id: string; email: string; username: string } | null;
  setLogin: (login: boolean) => void;
}

const ApplicationHome: React.FC<props> = ({ data, setLogin }) => {
  const [menu, setMenu] = useState<Menu>(Menu.DASHBOARD);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [semesterTables, setSemesterTables] = useState<SemesterTable[]>([]);

  const refreshEvents = () => {
    fetchEvents(data?._id, setEvents);
  };

  const refreshSemesterTables = () => {
    fetchSemesterTables(data?._id, setSemesterTables);
  };

  useEffect(() => {
    refreshEvents();
    refreshSemesterTables();
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
                semesterTables={semesterTables}
                refreshEventData={refreshEvents}
                refreshSemesterTableData={refreshSemesterTables}
                userid={data._id}
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
