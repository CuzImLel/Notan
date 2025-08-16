import React from "react";
import { useNavigate } from "react-router-dom";

const HomeView: React.FC = () => {
  const navigate: any = useNavigate();
  return (
    <>
      <div className="homeview_container">
        <div className="homeview_inner_container">
          <h1>Manage your college schedule easily!</h1>
          <p className="homeview_descriptionmessage">
            View your schedule, manage your homeworks and calculate your grades
            - without any limits!
          </p>
          <button onClick={() => navigate("/signup")}>Get started!</button>
          <p className="homeview_footermessage">
            Built with <a href="https://www.typescriptlang.org/">TypeScript</a>{" "}
            , <a href="https://react.dev/">React</a> and{" "}
            <a href="https://www.mongodb.com/">MongoDB</a>! <br></br>
            <br></br>Contributors:{" "}
            <a href="https://github.com/CuzImLel">JustDxniel</a>
          </p>
          <div className="homeview_featuresbox">
            <div className="homeview_featuresbox_top">
              <img src="../src/assets/images/calendar.png"></img>
              <h1>Notan</h1>
            </div>
            <div className="homeview_featuresbox_bottom">
              <ul>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Built in calendar</p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Fast grade calculation </p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Built in Todo list</p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Open Source and scaleable </p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Clean frontend design with modern features </p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Filters and more </p>
                </li>
                <li>
                  <span className="material-symbols-rounded">check_circle</span>
                  <p>Uncomplicated Web-Interface </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="homeview_footer_container">
        <footer className="homeview_footer">
          <p>© 2025 Notan All rights reserved. </p>

          <div className="homeview_footer_logobar">
            <img src="../src/assets/images/calendar.png"></img>
            <h1>Notan</h1>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeView;
