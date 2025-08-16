import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getAllEventsByUserId,
  updateEvent,
} from "../controllers/events";
export default (router: express.Router) => {
  router.get("/events", getAllEvents);
  router.get("/events/:userid", getAllEventsByUserId);
  router.post("/events", addEvent);
  router.delete("/events", deleteEvent);
  router.patch("/events/", updateEvent);
};
