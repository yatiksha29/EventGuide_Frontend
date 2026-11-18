
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventSearch from "../Event/EventSearch";
import Citizen from "../Citizen/Citizen";
import Favs from "../Event/Favs";
import eventBanner from "../assets/event-banner.jpg";
import "./CitizenDashboard.css";
import ChangePassword from "./ChangePassword";

function CitizenDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Find Vendors", icon: "⌕" },
    { name: "My Favourites", icon: "♡" },
    { name: "My Profile", icon: "♙" },
    { name: "Change Password", icon: "⚿" }
  ];

  return (
    <div className="citizen-dashboard">

      {/* Sidebar */}
      <aside className="citizen-sidebar">

        <div className="citizen-logo">
          <span>✦</span> EVENT GUIDE
        </div>

        <p className="sidebar-heading">MENU</p>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button
            className="sidebar-item logout-btn"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">↪</span>
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="citizen-main">

        {/* Dashboard Header - Hide on Find Vendors and My Profile */}
        {activePage !== "Find Vendors" &&
          activePage !== "My Favourites" &&
          activePage !== "My Profile" && (
            <header className="dashboard-topbar">
              <div className="dashboard-heading">
                <h2>{activePage}</h2>
                <p>Welcome to your Event Guide account</p>
              </div>

              <div className="citizen-avatar">C</div>
            </header>
          )}

        {/* Dashboard Home */}
        {activePage === "Dashboard" && (
          <div className="dashboard-content">

            <section className="welcome-banner">
              <div>
                <p className="welcome-small">
                  WELCOME TO EVENT GUIDE
                </p>

                <h1>Plan Your Perfect Event!</h1>

                <p>
                  Discover trusted vendors and make your
                  special occasions memorable.
                </p>

                <button
                  className="explore-btn"
                  onClick={() => setActivePage("Find Vendors")}
                >
                  Explore Vendors →
                </button>
              </div>

              <div className="banner-decoration">✦</div>
            </section>

            <section className="event-image-section">
              <img
                src={eventBanner}
                alt="Beautiful event decoration"
              />

              <div className="event-image-text">
                <h2>Every Event Deserves to Be Special</h2>
                <p>
                  Let's make your celebrations unforgettable.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* Find Vendors */}
        {activePage === "Find Vendors" && (
          <EventSearch />
        )}

        {/* My Favourites */}
        {activePage === "My Favourites" && (
          <Favs
            onBack={() => setActivePage("Dashboard")}
            onFavsChange={() => {}}
          />
        )}

        {/* My Profile */}
        {activePage === "My Profile" && (
          <Citizen />
        )}

        {/* Change Password */}
        {activePage === "Change Password" && <ChangePassword />}

      </main>
    </div>
  );
}

export default CitizenDashboard;
