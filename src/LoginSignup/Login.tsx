
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import url from "../url"

function Login() {

  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function handleLogin() {

    if (!emailid || !password) {
      alert("Please enter Email ID and Password");
      return;
    }

        try {

      let resp = await axios.post(`${url}/User/login`, {
        emailid: emailid,
        password: password
      });

      if (resp.data.status === true) {

        alert(JSON.stringify({
          utype: resp.data.utype,
          token: resp.data.token
        }));

        localStorage.setItem("token", resp.data.token);

        if (resp.data.utype === "citizen") {
          navigate("/citizendashboard");
        }
        else if (resp.data.utype === "vendor") {
          navigate("/vendordashboard");
        }

      }
      else {
        alert(resp.data.message);
      }

    }
    catch (error) {
      alert("Server connection failed");
      console.log(error);
    }
  }

  return (
    <div className="login-container">

      <div className="login-pic">
        <span className="auth-tag">WELCOME TO EVENT GUIDE</span>

        <h1>Every Celebration Begins With a Dream.</h1>

        <p>
          Find amazing vendors, discover event services
          and make your special moments memorable.
        </p>

        <div className="event-tags">
          <span>Explore Events</span>
          <span>Find Vendors</span>
          <span>Make Memories</span>
        </div>
      </div>

      <div className="login-form">

        <h2>Welcome Back!</h2>

        <p className="form-subtitle">
          Login to continue your event journey.
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <a href="#">Forgot Password?</a>

      </div>

    </div>
  );
}

export default Login;
