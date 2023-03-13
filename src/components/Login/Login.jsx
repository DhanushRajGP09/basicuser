import React, { useEffect, useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [emailvalue, setemail] = useState("");
  const [passwordvalue, setpassword] = useState("");

  const handleLogin = async () => {
    axios
      .post("http://139.59.56.122:5000/api/user/sign-in", {
        email: emailvalue,
        password: passwordvalue,
      })
      .then(function (response) {
        console.log(response);
        navigate("/instructionpage");
        localStorage.setItem(
          "token",
          JSON.stringify(response.headers.authorization)
        );
      })
      .catch(function (error) {
        console.log(error);
        alert("invalid user credentials");
      });
  };

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
          <input
            placeholder="Email"
            className="emailInput"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          ></input>
          <span className="emailText">Enter User password:</span>
          <input
            placeholder="Password"
            className="emailInput"
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></input>
          <button
            className="loginButton"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
