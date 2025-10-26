import React from "react";
import ToggleSwitch from "../utils/ToggleSwitch";
import NumberSelector from "../utils/NumberSelector";
import { minTime } from "date-fns/constants";

interface Props {
  closeModal: () => void;
  setTimer: (time: number) => void;

  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;

  music: boolean;
  setMusic: React.Dispatch<React.SetStateAction<boolean>>;

  notification: boolean;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;

  customTime: number;
  setCustomTime: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroTimerPreferences: React.FC<Props> = ({
  closeModal,
  setTimer,
  volume,
  setVolume,
  music,
  setMusic,
  notification,
  setNotification,
  customTime,
  setCustomTime,
}) => {
  const handleSettings = () => {
    setTimer(customTime * 60);
    closeModal();
  };

  const increaseMinutes = () => setCustomTime((prev) => Math.min(prev + 1, 60));
  const decreaseMinutes = () => setCustomTime((prev) => Math.max(prev - 1, 1));

  const reset = () => {
    setCustomTime(5);
    setVolume(50);
    setNotification(true);
    setMusic(true);
  };

  return (
    <div className="pomodoro_timer_preferences_container">
      <div className="pomodoro_timer_preferences_box">
        <div className="pomodoro_timer_preferences_top">
          <h1>User preferences</h1>
          <span className="material-symbols-rounded" onClick={closeModal}>
            close
          </span>
        </div>

        <div className="pomodoro_timer_preferences_checkbox_container">
          <div>
            <ToggleSwitch select={notification} setSelect={setNotification} />
            <label>Browser notifications</label>
          </div>
          <div>
            <ToggleSwitch select={music} setSelect={setMusic} />
            <label>Play music in the background</label>
          </div>
        </div>

        <div className="pomodoro_timer_preferences_volume">
          <h1>Notification volume ({volume + "%"})</h1>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
          <div className="pomodoro_timer_preferences_volume_bar">
            <p>0</p>
            <p>100</p>
          </div>
        </div>

        <div className="pomodoro_timer_preferences_time">
          <h1>Set custom time (min)</h1>
          <NumberSelector
            value={customTime}
            increase={increaseMinutes}
            decrease={decreaseMinutes}
          ></NumberSelector>
        </div>

        <div className="pomodoro_timer_preferences_buttons">
          <button className="pomodoro_timer_preferences_reset" onClick={reset}>
            Reset
          </button>
          <button
            className="pomodoro_timer_preferences_setTimer"
            onClick={handleSettings}
          >
            Set Timer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimerPreferences;
