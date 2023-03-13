import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Checkbox from "@mui/material/Checkbox";

export default function Homepage() {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    if (window.location.pathname === "/instructionpage") {
      document.getElementById("login").style.color = "red";
      document.getElementById("instruction").style.color = "red";
    }
  }, []);

  return (
    <div className="Homepage">
      <div className="loginHeader">
        <div className="loginHeaderDesc">
          <span id="login">{`Login >>`}</span>
          <span id="instruction">{`Instruction page >>`}</span>
          <span> {`Test page`}</span>
        </div>
      </div>
      <div className="instructionsPage">
        <div className="instructionsLeftContainer">
          <span>Instructions</span>
        </div>
        <div className="instructionsRightContainer">
          <div>
            <Checkbox {...label} />
            <span>
              I hereby, studied all the instructions and agree that i will
              surely take the test as followed in the instructions
            </span>
          </div>

          <button
            className="startTestButton"
            onClick={() => {
              navigate("/CodeCompiler");
            }}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
