import React, { useState } from "react";
import { CalendarEvent } from "../../utils/Event";
import ApplicationEventCard from "../ApplicationEventCard";
import { State } from "../../utils/State";
import { Priority } from "../../utils/Priority";

const MonthEventComponent: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  const startTime = event.start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = event.end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="calendar_event_box">
        <div className="calendar_event_top">
          <p>{event.title}</p>
        </div>
        <div className="calendar_event_bottom">
          <h5>{startTime + "–" + endTime}</h5>
        </div>
      </div>
    </>
  );
};

export default MonthEventComponent;
