import express from "express";
import {
  createEvent,
  deleteEventByID,
  getAllEventsByUserID,
  getEvents,
  updateEventByID,
} from "../db/event";
import { CalendarEvent } from "../types/Event";
export const getAllEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllEventsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userid } = req.params;
    const events = await getAllEventsByUserID(userid);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteEvent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.query.id as string;
    const deleteEvent = await deleteEventByID(id);
    res.json(deleteEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateEvent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { data } = req.body;

    const event = await updateEventByID(data._id, data);
    await event.save();
    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const addEvent = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const eventData = req.body as CalendarEvent;

    const event = await createEvent(eventData);

    res.status(200).json({
      message: "Event added successfully",
      event,
    });
  } catch (error: any) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
