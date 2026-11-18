import { Routes, Route } from "react-router-dom";

import NavBar from "./LoginSignup/NavBar";
import Home from "./LoginSignup/Home";
import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";
import EventSearch from "./Event/EventSearch";
import CitizenDashboard from "./Dashboard/CitizenDashboard";
import VendorDashboard from "./Dashboard/VendorDashboard";

function App() {
  return (
    <Routes>

      <Route path="/" element={
        <NavBar page="home">
            <Home />
          </NavBar>
        }/>

      <Route path="/login" element={
          <NavBar page="login">
            <Login />
          </NavBar>
        }/>

      <Route path="/signup" element={
          <NavBar page="signup">
            <Signup />
          </NavBar>
        }/>

        <Route
          path="/citizendashboard"
          element={<CitizenDashboard />}
        />

        <Route
          path="/vendordashboard"
          element={<VendorDashboard />}
        />

      <Route path="/eventsearch" element={
        <EventSearch />
      }/>


    </Routes>
  );
}

export default App;