
import { useState } from "react";
import "./Main.css";
import Login from "./Login";
import Signup from "./Signup";

function Main() {
  const [page, setPage] = useState("login");

  return (
    <div className="main">

      <div className="navbar">
        <h2>Event Guide</h2>

        {page === "login" ? (
          <button onClick={() => setPage("signup")}>
            Signup
          </button>
        ) : (
          <button onClick={() => setPage("login")}>
            Login
          </button>
        )}
      </div>

      {page === "login" ? (
        <Login />
      ) : (
        <Signup />
      )}

    </div>
  );
}

export default Main;
