/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useRef } from "react";

import "./Dropdown.css";

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = () => {

  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
