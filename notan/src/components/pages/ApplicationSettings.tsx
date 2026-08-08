import React, { useState } from "react";
import axios from "axios";
import UserData from "../../utils/UserData";

type Preferences = {
  showAnswerAutomatically: boolean;
  playTimerSound: boolean;
};

const preferenceKey = "notan-preferences";

const getSavedPreferences = (): Preferences => {
  const defaults: Preferences = {
    showAnswerAutomatically: false,
    playTimerSound: true,
  };

  try {
    const saved = localStorage.getItem(preferenceKey);
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  } catch {
    return defaults;
  }
};

interface Props {
  user: UserData;
  onUserUpdated: (user: UserData) => void;
}

const ApplicationSettings: React.FC<Props> = ({ user, onUserUpdated }) => {
  const [username, setUsername] = useState(user.username);
  const [preferences, setPreferences] = useState<Preferences>(
    getSavedPreferences,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const updatePreference = (key: keyof Preferences) => {
    const nextPreferences = { ...preferences, [key]: !preferences[key] };
    setPreferences(nextPreferences);
    localStorage.setItem(preferenceKey, JSON.stringify(nextPreferences));
  };

  const saveProfile = async () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      setMessage("Your name needs to contain at least 3 characters.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user._id}`,
        { username: trimmedUsername },
        { withCredentials: true },
      );
      const updatedUser = response.data.user as UserData;
      onUserUpdated(updatedUser);
      setMessage("Profile saved successfully.");
    } catch {
      setMessage("We could not save your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="application_settings">
      <section className="application_settings_hero">
        <div className="application_settings_avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <span>ACCOUNT SETTINGS</span>
          <h1>Make Notan yours</h1>
          <p>Manage your profile and personalize the way you study.</p>
        </div>
      </section>

      <section className="application_settings_grid">
        <article className="application_settings_card application_settings_profile">
          <div className="application_settings_card_heading">
            <span className="material-symbols-rounded">person</span>
            <div>
              <h2>Profile</h2>
              <p>Update the information shown across Notan.</p>
            </div>
          </div>

          <label htmlFor="settings-name">Display name</label>
          <input
            id="settings-name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            maxLength={40}
          />
          <label>Email address</label>
          <div className="application_settings_readonly_field">
            <span>{user.email}</span>
            <span className="material-symbols-rounded">lock</span>
          </div>
          <button
            className="application_settings_save"
            onClick={saveProfile}
            disabled={isSaving || username.trim() === user.username}
          >
            {isSaving ? "Saving..." : "Save profile"}
          </button>
          {message && <p className="application_settings_message">{message}</p>}
        </article>

        <article className="application_settings_card">
          <div className="application_settings_card_heading">
            <span className="material-symbols-rounded">school</span>
            <div>
              <h2>Study preferences</h2>
              <p>These preferences are saved on this device.</p>
            </div>
          </div>

          <div className="application_settings_option">
            <div>
              <h3>Reveal answers automatically</h3>
              <p>Show a flashcard answer immediately when studying.</p>
            </div>
            <button
              className="application_settings_switch"
              aria-label="Toggle automatic flashcard answers"
              aria-pressed={preferences.showAnswerAutomatically}
              onClick={() => updatePreference("showAnswerAutomatically")}
            >
              <span />
            </button>
          </div>

          <div className="application_settings_option">
            <div>
              <h3>Timer sound</h3>
              <p>Play a sound when a focus or break session ends.</p>
            </div>
            <button
              className="application_settings_switch"
              aria-label="Toggle timer sound"
              aria-pressed={preferences.playTimerSound}
              onClick={() => updatePreference("playTimerSound")}
            >
              <span />
            </button>
          </div>
        </article>

        <article className="application_settings_card application_settings_support">
          <div className="application_settings_card_heading">
            <span className="material-symbols-rounded">support_agent</span>
            <div>
              <h2>Need help?</h2>
              <p>Find answers and learn more about Notan&apos;s features.</p>
            </div>
          </div>
          <p className="application_settings_support_text">
            Visit the Help page for a quick start guide, feature explanations,
            and answers to common questions.
          </p>
        </article>
      </section>
    </main>
  );
};

export default ApplicationSettings;
