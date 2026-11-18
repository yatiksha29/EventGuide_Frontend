import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vendor_Regis from "../Vendor/Vendor_Regis";
import eventBanner from "../assets/event-banner.jpg";
import "./VendorDashboard.css";
import ChangePassword from "./ChangePassword";

function VendorDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "My Profile", icon: "♙" },
    { name: "Change Password", icon: "⚿" }
  ];

  return (
    <div className="vendor-dashboard">

      {/* Sidebar */}
      <aside className="vendor-sidebar">

        <div className="vendor-logo">
          <span>✦</span> EVENT GUIDE
        </div>

        <p className="vendor-sidebar-heading">MENU</p>

        <div className="vendor-sidebar-menu">

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "vendor-sidebar-item active"
                  : "vendor-sidebar-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span className="vendor-sidebar-icon">
                {item.icon}
              </span>

              {item.name}
            </button>
          ))}

          <button
            className="vendor-sidebar-item vendor-logout-btn"
            onClick={handleLogout}
          >
            <span className="vendor-sidebar-icon">↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="vendor-main">

        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <div className="vendor-dashboard-content">

            <section className="vendor-welcome-banner">
              <div>
                <p className="vendor-welcome-small">
                  WELCOME TO EVENT GUIDE
                </p>

                <h1>Welcome Vendor!</h1>

                <p>
                  Manage your business and connect with
                  customers through Event Guide.
                </p>
              </div>

              <div className="vendor-banner-decoration">
                ✦
              </div>
            </section>

            <section className="vendor-event-image">
              <img
                src={eventBanner}
                alt="Beautiful event decoration"
              />

              <div className="vendor-event-image-text">
                <h2>Make Every Event Memorable</h2>
                <p>
                  Be a part of someone's special celebration.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* My Profile */}
        {activePage === "My Profile" && (
          <Vendor_Regis />
        )}

        {/* Change Password */}
        {activePage === "Change Password" && (
          <ChangePassword/>
        )}

      </main>
    </div>
  );
}

export default VendorDashboard;
