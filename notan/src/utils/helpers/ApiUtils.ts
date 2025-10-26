import axios from "axios";
import { parseEventsToObjects } from "./EventHandler";

export const fetchEvents = (
  userid: string | undefined,
  setEvents: (res: any) => void
) => {
  axios
    .get("http://localhost:8080/events", {
      params: { userid: userid },
    })
    .then((res) => {
      setEvents(parseEventsToObjects(res));
      console.log("Successfully pulled all events:", res.data);
    })
    .catch((err) => {
      console.error(
        "An error occured while trying to fetch all events:",
        err.message
      );
    });
};

export const fetchSemesterTables = (
  userid: string | undefined,
  setSemesterTables: (res: any) => void
) => {
  axios
    .get("http://localhost:8080/semester_tables/", {
      params: { userid: userid },
    })
    .then((res) => {
      setSemesterTables(res.data);
      console.log("Successfully pulled all semester tables:", res.data);
    })
    .catch((err) => {
      console.error(
        "An error occured while trying to fetch all semester tables:",
        err.message
      );
    });
};

export const downloadJSON = (data: any, filename: string | undefined) => {
  if (filename === undefined || data === undefined) {
    return;
  }
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

export const formatSecondsToTimerDisplay = (secs: number): string => {
  const minutes: number = Math.floor(secs / 60);
  const seconds: number = secs % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
