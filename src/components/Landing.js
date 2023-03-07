import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "c01befd62dmsh57065a6e260cd65p1b2110jsn4f1c4d7b871f",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "c01befd62dmsh57065a6e260cd65p1b2110jsn4f1c4d7b871f",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [completed, setCompleted] = useState(4);
  const [hour, setHour] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [content, setContent] = useState(false);
  const [questionWidth, setQuestionWidth] = useState("4%");

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hour === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(60);
            setHour(hour - 1);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="Landing">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="landingHeader">
        RoboEarth
        <div className="totalCompletedDiv">
          {completed}/5 completed
          <div className="totalIndicator">
            <div
              className="completedIndicator"
              style={{ width: `${completed * 20}%` }}
            ></div>
          </div>
        </div>
        <div className="testTimer">
          {hour} : {minutes} : {seconds}
        </div>
        <button className="endTestButton">End Test</button>
      </div>

      <div className="landingBody">
        <div
          className="questionsContainer"
          style={{ width: `${questionWidth}` }}
        >
          <div className="questionNumberContainer">
            <span
              className="questionNumber"
              onClick={() => {
                setQuestionWidth("70%");
                setContent(true);
              }}
            >
              1
            </span>
            <span
              className="questionNumber"
              onClick={() => {
                setQuestionWidth("70%");
                setContent(true);
              }}
            >
              2
            </span>
            <span
              className="questionNumber"
              onClick={() => {
                setQuestionWidth("70%");
                setContent(true);
              }}
            >
              3
            </span>
            <span
              className="questionNumber"
              onClick={() => {
                setQuestionWidth("70%");
                setContent(true);
              }}
            >
              4
            </span>
            <span
              className="questionNumber"
              onClick={() => {
                setQuestionWidth("70%");
                setContent(true);
              }}
            >
              5
            </span>
          </div>
          <div
            className="questionContentContainer"
            style={{ display: content ? "flex" : "none" }}
          >
            <div
              className="closeContainer"
              onClick={() => {
                setQuestionWidth("4%");
                setContent(false);
              }}
            >
              x
            </div>
            <div className="detailedQuestion">
              1.sum of three numbers asdasdas asdasdsd asdasdasd asddasd asdasd
              sad asdasdasdasdasd
            </div>
            <div className="detailedQuestionDescription">
              asdasdsad sadasdasd asdasdsadasd sdasdasdasdasda asdasdasdasdasd
              dasdasdasdasdasd asdasdaddddddddddddddddddddddddd
              saaaaaaaaaaaaaaaaaa saaaaaaaaaaaaaaaaaaa
              asddddddddddddddddddddddddddddd saaaaaaaaaaaa saaaaaaaaaaaaaaa
              asds
            </div>
            <div className="samplesContainer">
              <div className="sampleInputContainer">
                Sample Input
                <div className="sample">25</div>
              </div>
              <div className="sampleOutputContainer">
                Sample Output
                <div className="sample">5</div>
              </div>
            </div>
            <div className="detailedQuestionExplanation">
              <span style={{ fontWeight: "bold" }}>Explanation</span>
              asdasdsad sadasdasd asdasdsadasd sdasdasdasdasda asdasdasdasdasd
              dasdasdasdasdasd asdasdaddddddddddddddddddddddddd
              saaaaaaaaaaaaaaaaaa saaaaaaaaaaaaaaaaaaa
              asddddddddddddddddddddddddddddd saaaaaaaaaaaa saaaaaaaaaaaaaaa
              asds
            </div>
          </div>
        </div>
        <div className="codeCompiler">
          <div className="selectedQuestionDiv">1.sum of three numbers</div>
          <div className="selectedQuestionCompilerDiv">
            <div className="flex flex-row">
              <div className="px-4 py-2 ">
                <LanguagesDropdown onSelectChange={onSelectChange} />
              </div>
              <div className="px-4 py-2">
                <ThemeDropdown
                  handleThemeChange={handleThemeChange}
                  theme={theme}
                />
              </div>
            </div>
            <div
              className="flex flex-row space-x-4 items-start px-4 py-4"
              id="compilerMainDiv"
            >
              <div
                className="flex flex-col w-full h-full justify-start items-end"
                id="codeEditor"
              >
                <CodeEditorWindow
                  code={code}
                  onChange={onChange}
                  language={language?.value}
                  theme={theme.value}
                />
              </div>

              <div
                className="right-container flex flex-shrink-0 w-[30%] flex-col"
                id="inputOutputDiv"
              >
                <div className="flex flex-col items-end">
                  <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                  />
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className={classnames(
                      "mt-4 bg-green-400 z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 text-white flex-shrink-0 font-semibold",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile and Execute"}
                  </button>
                </div>
                <OutputWindow outputDetails={outputDetails} />
                {outputDetails && (
                  <OutputDetails outputDetails={outputDetails} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
