
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import "../styles/NavBar.css";

type Props = {
  page: string;
  children: ReactNode;
};

function NavBar({ page, children }: Props) {
  let navigate = useNavigate();

  function doOpenNewComponent(url: string) {
    navigate("/" + url);
  }

  return (
    <div className="main">

      <div className="navbar">

        <Link to="/" className="navbar-logo">
          <span>✦</span> EVENT GUIDE
        </Link>

        {page === "home" && (
          <>
            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#categories">Categories</a>
              <a href="#features">Features</a>
              <a href="#about">About Us</a>
              <a href="#how-it-works">How It Works</a>
            </div>

            <div className="nav-buttons">
              <button
                className="nav-login"
                onClick={() => doOpenNewComponent("login")}
              >
                Login
              </button>

              <button
                className="nav-signup"
                onClick={() => doOpenNewComponent("signup")}
              >
                Get Started
              </button>
            </div>
          </>
        )}

        {page === "login" && (
          <div className="nav-buttons">
            <Link to="/" className="nav-login">
              Home
            </Link>

            <button
              className="nav-signup"
              onClick={() => doOpenNewComponent("signup")}
            >
              Signup
            </button>
          </div>
        )}

        {page === "signup" && (
          <div className="nav-buttons">
            <Link to="/" className="nav-login">
              Home
            </Link>

            <button
              className="nav-signup"
              onClick={() => doOpenNewComponent("login")}
            >
              Login
            </button>
          </div>
        )}

      </div>

      {children}

    </div>
  );
}

export default NavBar;
