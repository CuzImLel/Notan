import { Priority } from "./Priority";
import { State } from "./State";

export type CalendarEvent = {
  _id?: string;
  userid: string;
  title: string;
  description: string;
  priority: Priority;
  start: Date;
  end: Date;
  state: State;
};
