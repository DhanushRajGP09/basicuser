import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage/Homepage";
import TestEnd from "./components/TestEnd/TestEnd";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/instructionpage" element={<Homepage />}></Route>
          <Route path="/CodeCompiler" element={<Landing />}></Route>
          <Route path="/End" element={<TestEnd />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
