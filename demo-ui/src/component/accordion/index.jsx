import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Chevron from "./Chevron";

import "./Accordion.scss";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : "fit-content");
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button
        type="button"
        className={`accordion ${setActive}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill="#777" />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{props.children}</div>
      </div>
    </div>
  );
}

export default Accordion;
