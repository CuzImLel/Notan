import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/Navbar.css";
import "./styles/HomeView.css";
import "./styles/Login.css";
import "./styles/SignUp.css";
import "./styles/ErrorCard.css";
import "./styles/ApplicationNavbar.css";
import "./styles/ApplicationSidebar.css";
import "./styles/LogoutModal.css";
import "./styles/Forgot.css";
import "./styles/Application_Workspace.css";
import "./styles/ApplicationCalendar.css";
import "./styles/ApplicationEventCard.css";
import "./styles/EventCreatingModal.css";
import "./styles/ApplicationOperations.css";
import "./styles/GPAbox.css";
import "./styles/GradeOverviewChart.css";
import "./styles/GradeTable.css";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
/*<a href="https://www.flaticon.com/free-icons/user" title="user icons">
  User icons created by Freepik - Flaticon
</a>;
  <a
              href="https://www.flaticon.com/free-icons/calendar"
              title="calendar icons"
            >
              Calendar icons created by Graficon - Flaticon
            </a>
*/
