
import { useState } from "react";
import "../styles/Signup.css";
import url from "../url";

function Signup() {

  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [utype, setUtype] = useState("");

  async function handleSignup() {

    if (!emailid || !password || !utype) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        `${url}/User/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emailid,
            password,
            utype
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setEmailid("");
        setPassword("");
        setUtype("");
      }
      else {
        alert(data.message);
      }

    }
    catch (error) {
      alert("Server connection failed");
      console.log(error);
    }
  }

  return (
    <div className="signup-container">

      <div className="signup-pic">
        <span className="auth-tag">JOIN EVENT GUIDE</span>

        <h1>Let's Create Something Unforgettable.</h1>

        <p>
          Find the right people, services and inspiration
          for your next celebration.
        </p>

        <div className="event-tags">
          <span>Find Vendors</span>
          <span>Plan Events</span>
          <span>Celebrate More</span>
        </div>
      </div>

      <div className="signup-form">

        <h2>Create Account</h2>

        <p className="form-subtitle">
          Get started with Event Guide today.
        </p>

        <label>Email ID</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={emailid}
          onChange={(e) => setEmailid(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>User Type</label>
        <select
          value={utype}
          onChange={(e) => setUtype(e.target.value)}
        >
          <option value="">Select User Type</option>
          <option value="vendor">Vendor</option>
          <option value="citizen">Citizen</option>
        </select>

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Signup Now
        </button>

      </div>

    </div>
  );
}

export default Signup;
