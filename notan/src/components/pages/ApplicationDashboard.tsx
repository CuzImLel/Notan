import React from "react";
import { CalendarEvent } from "../../utils/Event";
import { Deck } from "../../utils/Deck";
import { SemesterTable } from "../../utils/SemesterTable";
import UserData from "../../utils/UserData";
import Menu from "../../utils/Menu";

interface Props {
  user: UserData;
  events: CalendarEvent[];
  decks: Deck[];
  semesterTables: SemesterTable[];
  setMenu: (menu: Menu) => void;
}

const ApplicationDashboard: React.FC<Props> = ({
  user,
  events,
  decks,
  semesterTables,
  setMenu,
}) => {
  const today = new Date();
  const upcomingEvents = [...events]
    .filter((event) => new Date(event.end).getTime() >= today.getTime())
    .sort((first, second) => new Date(first.start).getTime() - new Date(second.start).getTime())
    .slice(0, 4);
  const totalCards = decks.reduce((total, deck) => total + deck.flashcards.length, 0);
  const gradeEntries = semesterTables.flatMap((table) => table.content);
  const totalEcts = gradeEntries.reduce((total, entry) => total + Number(entry.ects || 0), 0);
  const totalWeight = gradeEntries.reduce(
    (total, entry) => total + Number(entry.weighting || 1),
    0,
  );
  const weightedGrade = gradeEntries.reduce(
    (total, entry) => total + Number(entry.grade || 0) * Number(entry.weighting || 1),
    0,
  );
  const gpa = totalWeight > 0 ? (weightedGrade / totalWeight).toFixed(1) : "–";
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <main className="application_dashboard">
      <section className="application_dashboard_hero">
        <div>
          <span className="application_dashboard_eyebrow">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
          <h1>{greeting}, {user.username}.</h1>
          <p>Here is a focused view of your semester.</p>
        </div>
        <div className="application_dashboard_actions">
          <button onClick={() => setMenu(Menu.CALENDAR)}>
            <span className="material-symbols-rounded">add</span>
            Add event
          </button>
          <button onClick={() => setMenu(Menu.SESSION)}>
            <span className="material-symbols-rounded">timer</span>
            Start session
          </button>
        </div>
      </section>

      <section className="application_dashboard_metrics">
        <article>
          <span className="material-symbols-rounded dashboard_metric_icon deadline">event_upcoming</span>
          <div><p>Upcoming events</p><strong>{upcomingEvents.length}</strong></div>
        </article>
        <article>
          <span className="material-symbols-rounded dashboard_metric_icon cards">style</span>
          <div><p>Flashcards ready</p><strong>{totalCards}</strong></div>
        </article>
        <article>
          <span className="material-symbols-rounded dashboard_metric_icon grade">functions</span>
          <div><p>Current average</p><strong>{gpa}</strong></div>
        </article>
        <article>
          <span className="material-symbols-rounded dashboard_metric_icon ects">school</span>
          <div><p>ECTS tracked</p><strong>{totalEcts}</strong></div>
        </article>
      </section>

      <section className="application_dashboard_content">
        <article className="application_dashboard_panel application_dashboard_schedule">
          <div className="application_dashboard_panel_heading">
            <div><h2>Coming up</h2><p>Your next scheduled events.</p></div>
            <button onClick={() => setMenu(Menu.CALENDAR)}>View calendar <span className="material-symbols-rounded">arrow_forward</span></button>
          </div>
          {upcomingEvents.length ? (
            <div className="application_dashboard_event_list">
              {upcomingEvents.map((event) => {
                const start = new Date(event.start);
                return (
                  <div className="application_dashboard_event" key={event._id}>
                    <div className="application_dashboard_event_date"><strong>{start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</strong><span>{start.toLocaleDateString("en-US", { weekday: "short" })}</span></div>
                    <div><h3>{event.title}</h3><p>{start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} · {event.priority} priority</p></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="application_dashboard_empty"><span className="material-symbols-rounded">event_available</span><p>No upcoming events. Enjoy the breathing room.</p></div>
          )}
        </article>

        <article className="application_dashboard_panel application_dashboard_focus">
          <span className="material-symbols-rounded">local_library</span>
          <p className="application_dashboard_eyebrow">STUDY MOMENTUM</p>
          <h2>Ready to make progress?</h2>
          <p>Review {totalCards || "your first"} flashcards or start a focused Pomodoro session.</p>
          <div>
            <button onClick={() => setMenu(Menu.FLASHCARDS)}>Open flashcards</button>
            <button onClick={() => setMenu(Menu.SESSION)}>Focus now</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ApplicationDashboard;
