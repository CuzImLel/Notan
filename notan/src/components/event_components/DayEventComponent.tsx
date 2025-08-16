import React from "react";
import { CalendarEvent } from "../../utils/Event";

const DayEventCalendar: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  return (
    <div className="calendar_event_box">
      <div className="calendar_event_top">
        <p>{event.title}</p>
      </div>
    </div>
  );
};

export default DayEventCalendar;
