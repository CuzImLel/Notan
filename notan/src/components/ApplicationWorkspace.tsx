import React from "react";
import CalendarComponent from "./pages/ApplicationCalendar";
import Menu from "../utils/Menu";
import { CalendarEvent } from "../utils/Event";
import ApplicationOperations from "./pages/ApplicationOperations";
import ApplicationSchedule from "./pages/ApplicationSchedule";
import { SemesterTable } from "../utils/SemesterTable";
import ApplicationSession from "./pages/ApplicationSession";

interface props {
  menu: Menu;
  events: CalendarEvent[];
  semesterTables: SemesterTable[];
  refreshEventData: () => void;
  refreshSemesterTableData: () => void;
  userid: string;
}

const ApplicationWorkspace: React.FC<props> = ({
  menu,
  events,
  semesterTables,
  refreshEventData,
  refreshSemesterTableData,
  userid,
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

          {menu == Menu.SCHEDULE ? (
            <ApplicationSchedule></ApplicationSchedule>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default ApplicationWorkspace;
