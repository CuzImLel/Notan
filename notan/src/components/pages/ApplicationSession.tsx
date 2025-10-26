import React, { useState, useEffect, useRef } from "react";
import { formatSecondsToTimerDisplay } from "../../utils/helpers/ApiUtils";
import PomodoroTimerPreferences from "../modals/PomodoroTimerPreferences";
import ring from "../../../src/assets/sounds/pomodorotimer_stop.mp3";
import lofi1 from "../../../src/assets/sounds/lofi1.mp3";

const ApplicationSession: React.FC = () => {
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [isRunning, setRunning] = useState(false);

  const [duration, setDuration] = useState(300);
  const [time, setTime] = useState(300);

  const [volume, setVolume] = useState(50);
  const [music, setMusic] = useState(true);
  const [notification, setNotification] = useState(true);
  const [customTime, setCustomTime] = useState(5);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const ringRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusicRef.current = new Audio(lofi1);
    bgMusicRef.current.loop = true;
    ringRef.current = new Audio(ring);

    return () => {
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
      ringRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) bgMusicRef.current.volume = volume / 100;
    if (ringRef.current) ringRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);
      bgMusicRef.current?.pause();
      bgMusicRef.current!.currentTime = 0;

      if (notification && ringRef.current) {
        ringRef.current.currentTime = 0;
        ringRef.current.play().catch(() => {});
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const handleStartStop = () => {
    setRunning((prev) => {
      const newState = !prev;

      if (newState) {
        if (music && bgMusicRef.current) {
          bgMusicRef.current.currentTime = 0;
          bgMusicRef.current.play().catch(() => {});
        }
      } else {
        bgMusicRef.current?.pause();
      }

      return newState;
    });
  };

  const reset = () => {
    setRunning(false);
    setTime(duration);
    bgMusicRef.current?.pause();
    bgMusicRef.current!.currentTime = 0;
  };

  return (
    <>
      {settingsMenu && (
        <PomodoroTimerPreferences
          closeModal={() => setSettingsMenu(false)}
          setTimer={(minutes: number) => {
            setTime(minutes);
            setDuration(minutes);
          }}
          volume={volume}
          setVolume={setVolume}
          music={music}
          setMusic={setMusic}
          notification={notification}
          setNotification={setNotification}
          customTime={customTime}
          setCustomTime={setCustomTime}
        />
      )}
      <div className="application_session_container">
        <div className="application_session_box">
          <div className="application_session_top">
            <h1>Pomodoro Timer</h1>
          </div>

          <div className="application_session_mid">
            <h1>{formatSecondsToTimerDisplay(time)}</h1>
          </div>

          <div className="application_session_bottom">
            <button
              className={
                isRunning ? "session_stop_button" : "session_start_button"
              }
              onClick={handleStartStop}
            >
              {isRunning ? "Stop" : "Start"}
            </button>

            <button className="session_reset_button" onClick={reset}>
              Reset
            </button>

            <button
              className="session_settings_button"
              onClick={() => setSettingsMenu(true)}
            >
              Settings
            </button>
          </div>
          <div className="equalizer_icon">
            {" "}
            <svg
              opacity={isRunning ? "1" : "0"}
              width="40px"
              height="28px"
              viewBox="0 0 10 7"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g fill="#1966caff">
                {" "}
                <rect
                  id="bar1"
                  transform="translate(0.500000, 6.000000) rotate(180.000000) translate(-0.500000, -6.000000) "
                  x="0"
                  y="5"
                  width="1"
                  height="2px"
                ></rect>{" "}
                <rect
                  id="bar2"
                  transform="translate(3.500000, 4.500000) rotate(180.000000) translate(-3.500000, -4.500000) "
                  x="3"
                  y="2"
                  width="1"
                  height="5"
                ></rect>{" "}
                <rect
                  id="bar3"
                  transform="translate(6.500000, 3.500000) rotate(180.000000) translate(-6.500000, -3.500000) "
                  x="6"
                  y="0"
                  width="1"
                  height="7"
                ></rect>{" "}
                <rect
                  id="bar4"
                  transform="translate(9.500000, 5.000000) rotate(180.000000) translate(-9.500000, -5.000000) "
                  x="9"
                  y="3"
                  width="1"
                  height="4"
                ></rect>{" "}
              </g>{" "}
            </svg>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationSession;
