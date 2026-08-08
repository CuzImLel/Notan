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
import {
  fetchDeckData,
  fetchEvents,
  fetchSemesterTables,
} from "../utils/helpers/ApiUtils";
import { Deck } from "../utils/Deck";

interface props {
  data: { _id: string; email: string; username: string } | null;
  setLogin: (login: boolean) => void;
  setUserData: React.Dispatch<
    React.SetStateAction<{ _id: string; email: string; username: string } | null>
  >;
}

const ApplicationHome: React.FC<props> = ({ data, setLogin, setUserData }) => {
  const [menu, setMenu] = useState<Menu>(Menu.DASHBOARD);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [semesterTables, setSemesterTables] = useState<SemesterTable[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);

  const refreshEvents = () => {
    fetchEvents(data?._id, setEvents);
  };

  const refreshDeckData = () => {
    fetchDeckData(data?._id, setDecks);
  };

  const refreshSemesterTables = () => {
    fetchSemesterTables(data?._id, setSemesterTables);
  };

  useEffect(() => {
    refreshEvents();
    refreshSemesterTables();
    refreshDeckData();
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
                decks={decks}
                semesterTables={semesterTables}
                refreshEventData={refreshEvents}
                refreshSemesterTableData={refreshSemesterTables}
                refreshDeckData={refreshDeckData}
                userid={data._id}
                user={data}
                onUserUpdated={setUserData}
                setMenu={setMenu}
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
