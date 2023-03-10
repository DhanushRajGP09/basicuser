import React from "react";
import "./EndModal.css";
import closemodal from "../../../Assets/Images/close.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addQuestions,
  addDefaultCode,
  addTest,
  addTestStatus,
} from "../../../features/Questions/QuestionsSlice";

export default function EndModal(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    navigate("/End");
    dispatch(addTest({}));
    dispatch(addTestStatus("ended"));
    dispatch(addDefaultCode(""));
    dispatch(addQuestions([]));
  };

  return (
    <div>
      <div
        className="createTestmodal"
        style={{ display: props.endmodal ? "flex" : "none" }}
      >
        <div className="createTestoverlay">
          <div className="createTestmodal-content">
            <img
              src={closemodal}
              className="closeCreateModal"
              onClick={() => {
                props.setEndModal(false);
              }}
            ></img>
            <div className="createTestmodal-inner-content">
              Are You Sure?
              <span style={{ fontSize: "20px" }}>You want to end the test</span>
              <span style={{ fontSize: "15px" }}>
                (*warning: You cannot take the test again once you ended it)
              </span>
              <div className="exitButtonDiv">
                <button
                  className="exitNo"
                  onClick={() => {
                    props.setEndModal(false);
                  }}
                >
                  No
                </button>
                <button
                  className="exitYes"
                  onClick={() => {
                    logout();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
