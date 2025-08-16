import React from "react";
import CalendarComponent from "./pages/ApplicationCalendar";
import Menu from "../utils/Menu";
import { CalendarEvent } from "../utils/Event";
import ApplicationOperations from "./pages/ApplicationOperations";
import ApplicationSchedule from "./pages/ApplicationSchedule";

interface props {
  menu: Menu;
  events: CalendarEvent[];
  refreshEventData: () => void;
}

const ApplicationWorkspace: React.FC<props> = ({
  menu,
  events,
  refreshEventData,
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
            <ApplicationOperations></ApplicationOperations>
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
