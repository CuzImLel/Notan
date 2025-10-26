import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { de } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "../../utils/Event";
import MonthEventComponent from "../event_components/MonthEventComponent";
import WeekEventComponent from "../event_components/WeekEventComponent";
import DayEventComponent from "../event_components/DayEventComponent";
import AgendaEventComponent from "../event_components/AgendaEventCalendar";
import ApplicationEventCard from "../ApplicationEventCard";
import EventCreatingModal from "../modals/EventCreatingModal";

const locales = { de: de };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface props {
  events: CalendarEvent[];
  refreshCalendar: () => void;
}

const CalendarComponent: React.FC<props> = ({ events, refreshCalendar }) => {
  const [view, setView] = useState<View>(Views.MONTH);

  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const eventComponentMap: Record<
    string,
    React.FC<{ event: CalendarEvent }>
  > = {
    month: MonthEventComponent,
    week: WeekEventComponent,
    day: DayEventComponent,
    agenda: AgendaEventComponent,
  };

  const messages = {
    noEventsInRange: "There are currently no events in this range!",
  };

  return (
    <>
      <div className="calendar_box">
        <Calendar
          formats={{ eventTimeRangeFormat: () => "" }}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="en"
          view={view}
          onView={(newView) => setView(newView)}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          style={{ height: "100%" }}
          components={{ event: eventComponentMap[view] }}
          messages={messages}
          onSelectEvent={(event) => setSelectedEvent(event as CalendarEvent)}
        />
      </div>

      {selectedEvent && (
        <ApplicationEventCard
          event={selectedEvent}
          closeEventConfig={() => setSelectedEvent(null)}
          refreshCalendar={refreshCalendar}
        />
      )}
    </>
  );
};

export default CalendarComponent;
