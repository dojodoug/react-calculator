import React from "react";
import "./Toggle.css";

const Toggle = ({ toggleTheme }) => (
  <div className="toggle_div">
    <button className="toggle_button" onClick={e => toggleTheme()}>
      Toggle Theme
    </button>
  </div>
);

export default Toggle;