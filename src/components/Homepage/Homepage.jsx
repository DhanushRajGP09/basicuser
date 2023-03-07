import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="Homepage">
      <h1>Home</h1>
      <button
        className="startTestButton"
        onClick={() => {
          navigate("/CodeCompiler");
        }}
      >
        Start Test
      </button>
    </div>
  );
}
