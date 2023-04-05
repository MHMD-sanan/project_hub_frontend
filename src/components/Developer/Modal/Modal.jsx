import React from "react";

function Modal(props) {
  return (
    <div
      className="modal fixed top-0 left-0 h-full min-h-screen w-full flex justify-center items-center z-20 bg-half-transparent"
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className="modal_content overflow-y-auto bg-gray-900 rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
