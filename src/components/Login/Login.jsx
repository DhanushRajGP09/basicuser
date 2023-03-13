import React, { useEffect } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      document.getElementById("login").style.color = "red";
    }
  }, []);

  return (
    <div className="loginPage">
      <div className="loginHeader">
        <div className="loginHeaderDesc">
          <span id="login">{`Login >>`}</span>
          <span id="instruction">{`Instruction page >>`}</span>
          <span> {`Test page`}</span>
        </div>
      </div>

      <div className="loginDiv">
        <span
          style={{
            width: "100%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Please Enter the user credentials you have been recieved on email
        </span>
        <div className="emailPasswordDiv">
          <span className="emailText">Enter User email:</span>
          <input placeholder="Email" className="emailInput"></input>
          <span className="emailText">Enter User password:</span>
          <input
            placeholder="Password"
            className="emailInput"
            type="password"
          ></input>
          <button
            className="loginButton"
            onClick={() => {
              navigate("/instructionpage");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
