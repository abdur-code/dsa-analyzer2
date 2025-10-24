import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, onLanguageChange, code, onCodeChange }) => {
  const [theme, setTheme] = useState("vs-dark");

  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <button
          onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
          className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg text-sm font-medium text-white transition"
        >
          {theme === "vs-dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-700/50 shadow-inner">
        <Editor
          height="450px"
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => onCodeChange(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "on",
            roundedSelection: true,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            parameterHints: {
              enabled: true
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            wordBasedSuggestions: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showWords: true,
            }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
