export const parseEventsToObjects = (res: any) => {
  const eventsWithDates = res.data.map((event: any) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  return eventsWithDates;
};
