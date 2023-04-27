import React, { useState, useRef } from "react";
import "./Accordion.scss";

function Accordion1(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div id="accordion" className="accordion-container">
        <h4
          className={`accordion-title js-accordion-title${
            isOpen ? " open" : ""
          }`}
          onClick={() => setIsOpen((pre) => !pre)}
        >
          Accordion Title 1
        </h4>
        <div
          className={`accordion-content`}
          style={{ display: isOpen ? "block" : "none" }}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Accordion1;
