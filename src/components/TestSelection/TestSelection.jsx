import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestions,
  addTestStatus,
  getTestStatus,
  getTests,
} from "../../features/Questions/QuestionsSlice";
import "./TestSelection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TestSelection() {
  const gettest = useSelector(getTests);
  console.log("....", gettest);

  useEffect(() => {
    if (window.location.pathname === "/selecttest") {
      document.getElementById("login").style.color = "red";
      document.getElementById("instruction").style.color = "red";
      document.getElementById("test").style.color = "red";
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const testID = JSON.parse(localStorage.getItem("testid"));

  console.log(".");

  const handleSubmit = async () => {
    console.log("....", token);

    axios
      .post(
        `http://139.59.56.122:5000/api/user/take-test?testId=${testID}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
        dispatch(addQuestions(response.data.data.questions));
        dispatch(addTestStatus("started"));
        navigate("/CodeCompiler");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const teststatus = useSelector(getTestStatus);

  useEffect(() => {
    if (teststatus === "started") {
      navigate("/CodeCompiler");
    }
  }, []);

  return (
    <div className="testSelectPage">
      <div className="loginHeader">
        <div className="loginHeaderDesc">
          <span id="login">{`Login >>`}</span>
          <span id="instruction">{`Instruction page >>`}</span>
          <span id="test"> {`Test page`}</span>
        </div>
      </div>
      <div className="testPageContainer">
        <div className="testContainer">
          <span>{gettest.testName}</span>
          <span>{gettest.questionId.length} Questions</span>
          <span>Test duration: {gettest.testDuration}</span>
          <button
            className="enterTestButton"
            onClick={() => {
              handleSubmit();
            }}
          >
            Enter Test
          </button>
        </div>
      </div>
    </div>
  );
}
