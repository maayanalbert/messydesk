import React from "react";
import "./App.css";
import Canvas from "./Components/Canvas";
import { StampContextProvider } from "./hooks/StampContext";

function App() {
  document.body.style.background = "black";

  return (
    <div>
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <StampContextProvider>
        <Canvas />
      </StampContextProvider>
    </div>
  );
}

export default App;
