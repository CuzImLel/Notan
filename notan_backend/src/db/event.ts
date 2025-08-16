import mongoose from "mongoose";
import { CalendarEvent } from "../types/Event";
import { Priority } from "../types/Priority";
import { State } from "../types/State";

const EventSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: Object.values(Priority), required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  state: { type: String, enum: Object.values(State), required: true },
});

export const EventModel = mongoose.model("Event", EventSchema, "events");

export const getEvents = () => EventModel.find();
export const getAllEventsByUserID = (_id: string) =>
  EventModel.find({ userid: _id });
export const deleteEventByID = (eventid: string) =>
  EventModel.findByIdAndDelete(eventid);
export const createEvent = (values: CalendarEvent) =>
  new EventModel(values).save().then((event) => event.toObject());
export const updateEventByID = (eventid: string, values: CalendarEvent) =>
  EventModel.findByIdAndUpdate(eventid, values);
