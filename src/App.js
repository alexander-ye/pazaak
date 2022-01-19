import React, { useState, useEffect } from "react";
import LocalGameComponent from "./components/LocalGameComponent";
import Player from "./classes/player";

function App() {
  return (
    <div className="App">
      <LocalGameComponent />
    </div>
  );
}

export default App;
