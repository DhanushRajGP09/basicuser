import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { addTest, getTests } from "../../features/Questions/QuestionsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname === "/instructionpage") {
      document.getElementById("login").style.color = "red";
      document.getElementById("instruction").style.color = "red";
    }
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleSubmit = async () => {
    axios
      .get(
        "http://139.59.56.122:5000/api/user/take-test",

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.success === true) {
          localStorage.setItem(
            "testid",
            JSON.stringify(response.data.data[0]._id)
          );
          dispatch(addTest(response.data.data[0]));
          navigate("/selecttest");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("you don't have any test");
      });
  };

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
              handleSubmit();
            }}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
