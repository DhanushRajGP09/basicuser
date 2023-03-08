import React, { useEffect, useRef, useState } from "react";

import MonacoEditor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e) => {
      // prevent the right-click menu from appearing
      e.preventDefault();
    };

    const handlePaste = (e) => {
      e.preventDefault();
    };
    // attach the event listener to
    // the document object
    document.addEventListener("contextmenu", handleContextMenu);
    document.getElementById("editor").addEventListener("paste", handlePaste);

    // clean up the event listener when
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const editorRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.onDidPaste((event) => {
      event.preventDefault();
      const pastedText = event.clipboardData.getData("text/plain");
      const modifiedText = modifyPastedText(pastedText);
      const currentPosition = editor.getPosition();
      editor.executeEdits("paste", [
        {
          range: new monaco.Range(
            currentPosition.lineNumber,
            currentPosition.column,
            currentPosition.lineNumber,
            currentPosition.column
          ),
          text: modifiedText,
          forceMoveMarkers: true,
        },
      ]);
    });
  }
  function modifyPastedText(text) {
    // perform any necessary modifications to the pasted text
    return text;
  }

  return (
    <div
      className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl"
      id="editor"
      onPaste={(e) => {
        e.preventDefault();
      }}
    >
      <MonacoEditor
        height="60vh"
        width={"90%"}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
