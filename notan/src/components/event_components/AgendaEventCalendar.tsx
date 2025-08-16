import React from "react";
import { CalendarEvent } from "../../utils/Event";

const AgendaEventComponent: React.FC<{ event: CalendarEvent }> = ({
  event,
}) => {
  return (
    <div className="calendar_event_box_agenda">
      <div className="calendar_event_top_agenda">
        <p>{event.title}</p>
      </div>
    </div>
  );
};

export default AgendaEventComponent;
