import React from "react";

const ApplicationHelp: React.FC = () => {
  return (
    <main className="application_help">
      <section className="application_help_hero">
        <div>
          <span className="application_help_eyebrow">NOTAN GUIDE</span>
          <h1>How can we help?</h1>
          <p>
            A quick guide to organizing your studies, tracking progress, and
            making every study session count.
          </p>
        </div>
        <span className="material-symbols-rounded application_help_hero_icon">
          auto_stories
        </span>
      </section>

      <section className="application_help_section">
        <div className="application_help_section_heading">
          <span className="material-symbols-rounded">rocket_launch</span>
          <div>
            <h2>Get started in four steps</h2>
            <p>Set up your workspace and keep your semester under control.</p>
          </div>
        </div>
        <div className="application_help_steps">
          <article className="application_help_step">
            <span>01</span>
            <h3>Plan your semester</h3>
            <p>Add your courses and important dates to the Calendar.</p>
          </article>
          <article className="application_help_step">
            <span>02</span>
            <h3>Track your grades</h3>
            <p>Use Operations to record grades, ECTS, and weightings.</p>
          </article>
          <article className="application_help_step">
            <span>03</span>
            <h3>Create flashcards</h3>
            <p>Group questions in decks and review them whenever you study.</p>
          </article>
          <article className="application_help_step">
            <span>04</span>
            <h3>Focus with a session</h3>
            <p>Use the Pomodoro timer to work with intention and take breaks.</p>
          </article>
        </div>
      </section>

      <section className="application_help_section">
        <div className="application_help_section_heading">
          <span className="material-symbols-rounded">explore</span>
          <div>
            <h2>Explore Notan</h2>
            <p>Everything you need to keep your academic life organized.</p>
          </div>
        </div>
        <div className="application_help_features">
          <article>
            <span className="material-symbols-rounded">calendar_month</span>
            <h3>Calendar</h3>
            <p>Keep lectures, deadlines, and exams in one clear view.</p>
          </article>
          <article>
            <span className="material-symbols-rounded">functions</span>
            <h3>Operations</h3>
            <p>Calculate your weighted average and see your ECTS progress.</p>
          </article>
          <article>
            <span className="material-symbols-rounded">note_stack</span>
            <h3>Flashcards</h3>
            <p>Build compact study decks and reveal answers when you are ready.</p>
          </article>
          <article>
            <span className="material-symbols-rounded">timer</span>
            <h3>Session</h3>
            <p>Stay focused with a customizable Pomodoro study timer.</p>
          </article>
        </div>
      </section>

      <section className="application_help_faq">
        <div className="application_help_section_heading">
          <span className="material-symbols-rounded">help</span>
          <div>
            <h2>Frequently asked questions</h2>
            <p>Helpful answers for the most common tasks.</p>
          </div>
        </div>
        <details open>
          <summary>How do I create a flashcard deck?</summary>
          <p>
            Open Flashcards, choose “Add Deck”, enter a title, and then open
            the deck to add your first flashcards.
          </p>
        </details>
        <details>
          <summary>How is my grade average calculated?</summary>
          <p>
            Add a grade, its ECTS value, and weighting in Operations. Notan
            uses those values to calculate your weighted average.
          </p>
        </details>
        <details>
          <summary>Can I change the Pomodoro timer?</summary>
          <p>
            Yes. Open Session and select Settings to adjust focus and break
            durations to your preferred rhythm.
          </p>
        </details>
      </section>
    </main>
  );
};

export default ApplicationHelp;
