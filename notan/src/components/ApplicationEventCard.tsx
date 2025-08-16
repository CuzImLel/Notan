import React, { useRef, useState } from "react";
import { CalendarEvent } from "../utils/Event";
import { Priority, PriorityConfig } from "../utils/Priority";
import { formatDateToLocalDatetime } from "../utils/helpers/DateUtils";
import { State } from "../utils/State";
import axios from "axios";
import { Calendar } from "react-big-calendar";

interface props {
  event: CalendarEvent;
  closeEventConfig: () => void;
  refreshCalendar: () => void;
}

const ApplicationEventCard: React.FC<props> = ({
  event,
  closeEventConfig,
  refreshCalendar,
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>(event.title);
  const [description, setDescription] = useState<string>(event.description);
  const [startDate, setStartDate] = useState<Date>(event.start);
  const [endDate, setEndDate] = useState<Date>(event.end);
  const [priority, setPriority] = useState<Priority>(event.priority);
  const [state, setState] = useState<State>(event.state);

  const checkForChange = (): boolean => {
    if (
      event.title != title ||
      event.description != description ||
      event.start != startDate ||
      event.end != endDate ||
      event.state != state ||
      event.priority != priority
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!checkForChange) return;
    axios
      .patch("http://localhost:8080/events", {
        data: {
          _id: event._id,
          userid: event.userid,
          title: title,
          description: description,
          priority: priority,
          start: startDate,
          end: endDate,
          state: state,
        },
      })
      .then((res) => {
        console.log("Successfully updated event");
        refreshCalendar();
        closeEventConfig();
      })
      .catch((err: any) => {
        //displayError(err.response.data.message);
      });
  };

  const deleteEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/events", {
        params: { id: event._id },
      })
      .then((res) => {
        console.log("Successfully deleted event");
        refreshCalendar();
        closeEventConfig();
      })
      .catch((err: any) => {
        //displayError(err.response.data.message);
      });
  };

  return (
    <>
      <div className="event_config_popup">
        <div className="event_config_popup_box">
          <div className="event_config_popup_box_upper">
            <h2>📝 Edit event</h2>
            <span
              className="material-symbols-rounded"
              onClick={() => {
                closeEventConfig();
              }}
            >
              close
            </span>
          </div>
          <div className="event_config_popup_box_mid">
            <div className="event_config_popup_box_mid_input_box">
              <label>Title:</label>
              <div>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  minLength={3}
                  maxLength={50}
                />
                <span
                  className="material-symbols-rounded"
                  onClick={() => titleInputRef.current?.focus()}
                >
                  edit
                </span>
              </div>
            </div>
            <div className="event_config_popup_box_mid_input_box">
              <label>Description:</label>
              <div>
                <input
                  ref={descriptionInputRef}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={3}
                  maxLength={200}
                />
                <span
                  className="material-symbols-rounded"
                  onClick={() => descriptionInputRef.current?.focus()}
                >
                  edit
                </span>
              </div>
            </div>
            <label>Start:</label>
            <input
              type="datetime-local"
              onChange={(e) => setStartDate(new Date(e.target.value))}
              value={formatDateToLocalDatetime(startDate)}
            />

            <label>End:</label>
            <input
              type="datetime-local"
              onChange={(e) => setEndDate(new Date(e.target.value))}
              value={formatDateToLocalDatetime(endDate)}
            />

            <label>Priority:</label>
            <select>
              <option
                selected={priority === Priority.LOW}
                onClick={() => setPriority(Priority.LOW)}
              >
                Low
              </option>
              <option
                selected={priority === Priority.MEDIUM}
                onClick={() => setPriority(Priority.MEDIUM)}
              >
                Medium
              </option>
              <option
                selected={priority === Priority.HIGH}
                onClick={() => setPriority(Priority.HIGH)}
              >
                High
              </option>
            </select>

            <label>State:</label>
            <select>
              <option
                selected={state === State.REMAINING}
                onClick={() => setState(State.REMAINING)}
              >
                Remaining
              </option>
              <option
                selected={state === State.IN_PROGRESS}
                onClick={() => setState(State.IN_PROGRESS)}
              >
                In Progress
              </option>
              <option
                selected={state === State.DONE}
                onClick={() => setState(State.DONE)}
              >
                Done
              </option>
            </select>
          </div>
          <div className="event_config_popup_box_under">
            <button
              className="event_config_popup_box_under_delete_button"
              onClick={(e) => deleteEvent(e)}
            >
              🗑️ Delete
            </button>
            <button
              className={
                checkForChange()
                  ? "event_config_popup_box_under_save_button_active"
                  : "event_config_popup_box_under_save_button"
              }
              disabled={!checkForChange()}
              onClick={(e) => updateEvent(e)}
            >
              💾 Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationEventCard;
