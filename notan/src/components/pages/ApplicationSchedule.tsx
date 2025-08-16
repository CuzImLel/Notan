import { Calendar, dateFnsLocalizer, DateLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";
import { de } from "date-fns/locale";

const locales = { de: de };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => 1,
  getDay,
  locales,
});

const events = [
  {
    title: "Mathematik",
    start: new Date(2025, 8, 4, 8, 0),
    end: new Date(2025, 8, 4, 9, 30),
  },
];

const ApplicationSchedule: React.FC = () => {
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        step={30}
        timeslots={2}
        defaultDate={new Date(2025, 0, 6)}
        toolbar={false}
        formats={{
          dayFormat: (date, culture, localizer: any) =>
            localizer.format(date, "EEEE", culture),
        }}
      />
    </>
  );
};

export default ApplicationSchedule;
