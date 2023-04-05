/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";

import { X } from "react-feather";

import "./Editable.css";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");
  const [privileges, setPrevileges] = useState("");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText, privileges);
      setPrevileges("");
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          {props.checkbox ? (
            <div className="topping">
              <p className="ml-20">Select Privileges</p>
              <br />
              <input
                className="ml-6"
                type="checkbox"
                name="topping"
                value="Developer"
                onChange={(e) => setPrevileges(e.target.value)}
              />
              Developer
            </div>
          ) : (
            ""
          )}
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;
