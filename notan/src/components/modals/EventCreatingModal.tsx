import React, { ButtonHTMLAttributes, useState } from "react";
import { Priority } from "../../utils/Priority";
import { State } from "../../utils/State";
import axios from "axios";
import UserData from "../../utils/UserData";

interface props {
  user: UserData;
  closeModal: () => void;
  refreshCalendar: () => void;
}

const EventCreatingModal: React.FC<props> = ({
  user,
  closeModal,
  refreshCalendar,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority>(
    Priority.LOW
  );
  const [selectedState, setSelectedState] = useState<State>(State.REMAINING);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      return;
    }

    if (description.length < 3) {
      return;
    }
    if (!startDate) {
      return;
    }

    if (!endDate) {
      return;
    }

    axios
      .post("http://localhost:8080/events", {
        userid: user._id,
        title: title,
        description: description,
        priority: selectedPriority,
        start: startDate,
        end: endDate,
        state: selectedState,
      })
      .then((res) => {
        console.log("Successfully added new Event");
        refreshCalendar();
      })
      .catch((err: any) => {
        //displayError(err.response.data.message);
      });
    closeModal();
  };

  return (
    <>
      <div className="event_creation_modal">
        <div className="event_creation_modal_box">
          <div className="event_creation_modal_box_top">
            <h1>Add Event</h1>
            <span className="material-symbols-rounded" onClick={closeModal}>
              close
            </span>
          </div>
          <div className="event_creation_modal_box_content">
            <div className="event_creation_modal_box_mid">
              <form>
                <ul>
                  <li>
                    <p>Event name:</p>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      maxLength={50}
                      type="text"
                      required
                      className="event_creation_modal_box_mid_eventname_input"
                    ></input>
                  </li>
                  <li>
                    <p>Event description:</p>
                    <input
                      maxLength={200}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      type="text"
                      required
                      className="event_creation_modal_box_mid_eventdescription_input"
                    ></input>
                  </li>
                  <li>
                    <div className="event_creation_modal_box_mid_timeslot_section">
                      <div className="event_creation_modal_box_mid_timeslot_section_start">
                        <p>Start:</p>
                        <div>
                          <input
                            required
                            type="datetime-local"
                            onChange={(e) =>
                              setStartDate(new Date(e.target.value))
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="event_creation_modal_box_mid_timeslot_section_end">
                        <p>End:</p>
                        <div>
                          <input
                            required
                            type="datetime-local"
                            onChange={(e) =>
                              setEndDate(new Date(e.target.value))
                            }
                          ></input>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p>Event Priority:</p>
                    <div className="event_creation_modal_box_mid_priorities">
                      <div
                        onClick={() => setSelectedPriority(Priority.LOW)}
                        className={
                          selectedPriority === Priority.LOW
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>Low</p>
                      </div>
                      <div
                        onClick={() => setSelectedPriority(Priority.MEDIUM)}
                        className={
                          selectedPriority === Priority.MEDIUM
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>Medium</p>
                      </div>
                      <div
                        onClick={() => setSelectedPriority(Priority.HIGH)}
                        className={
                          selectedPriority === Priority.HIGH
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>High</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p>Event State:</p>
                    <div className="event_creation_modal_box_mid_states">
                      <div
                        onClick={() => setSelectedState(State.REMAINING)}
                        className={
                          selectedState === State.REMAINING
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>Remaining</p>
                      </div>
                      <div
                        onClick={() => setSelectedState(State.IN_PROGRESS)}
                        className={
                          selectedState === State.IN_PROGRESS
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>In progress</p>
                      </div>
                      <div
                        onClick={() => setSelectedState(State.DONE)}
                        className={
                          selectedState === State.DONE
                            ? "event_creation_modal_selected"
                            : "event_creation_modal_unselected"
                        }
                      >
                        <span className="material-symbols-rounded">done</span>
                        <p>Done</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
            <div className="event_creation_modal_box_bottom">
              <button
                type="submit"
                className="event_creation_modal_create"
                onClick={(e) => handleSubmit(e)}
              >
                Create Event*
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCreatingModal;
