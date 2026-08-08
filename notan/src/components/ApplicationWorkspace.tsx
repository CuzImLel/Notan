import React from "react";
import CalendarComponent from "./pages/ApplicationCalendar";
import Menu from "../utils/Menu";
import { CalendarEvent } from "../utils/Event";
import ApplicationOperations from "./pages/ApplicationOperations";
import ApplicationFlashcards from "./pages/ApplicationFlashcards";
import { SemesterTable } from "../utils/SemesterTable";
import ApplicationSession from "./pages/ApplicationSession";
import { Deck } from "../utils/Deck";
import ApplicationHelp from "./pages/ApplicationHelp";
import ApplicationSettings from "./pages/ApplicationSettings";
import UserData from "../utils/UserData";
import ApplicationDashboard from "./pages/ApplicationDashboard";

interface props {
  menu: Menu;
  events: CalendarEvent[];
  semesterTables: SemesterTable[];
  decks: Deck[];
  refreshEventData: () => void;
  refreshSemesterTableData: () => void;
  refreshDeckData: () => void;
  userid: string;
  user: UserData;
  onUserUpdated: (user: UserData) => void;
  setMenu: (menu: Menu) => void;
}

const ApplicationWorkspace: React.FC<props> = ({
  menu,
  events,
  semesterTables,
  refreshEventData,
  refreshSemesterTableData,
  refreshDeckData,
  userid,
  decks,
  user,
  onUserUpdated,
  setMenu,
}) => {
  return (
    <>
      <section className="app_workspace">
        <div className="app_workspace_inner">
          {menu == Menu.CALENDAR ? (
            <CalendarComponent
              events={events}
              refreshCalendar={refreshEventData}
            ></CalendarComponent>
          ) : (
            ""
          )}
          {menu == Menu.GRADES ? (
            <ApplicationOperations
              userid={userid}
              semesterTables={semesterTables}
              refreshSemesterTableData={refreshSemesterTableData}
            ></ApplicationOperations>
          ) : (
            ""
          )}

          {menu == Menu.SESSION ? (
            <ApplicationSession></ApplicationSession>
          ) : (
            ""
          )}

          {menu == Menu.FLASHCARDS ? (
            <ApplicationFlashcards
              userid={userid}
              decks={decks}
              refreshDeckData={refreshDeckData}
            ></ApplicationFlashcards>
          ) : (
            ""
          )}
          {menu == Menu.DASHBOARD ? (
            <ApplicationDashboard
              user={user}
              events={events}
              decks={decks}
              semesterTables={semesterTables}
              setMenu={setMenu}
            />
          ) : (
            ""
          )}

          {menu == Menu.HELP ? <ApplicationHelp /> : ""}
          {menu == Menu.SETTINGS ? (
            <ApplicationSettings user={user} onUserUpdated={onUserUpdated} />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default ApplicationWorkspace;
