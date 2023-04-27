/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from "react";
import PropsType from "prop-types";

/* const Loader = () => (
  <div className="spinner">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
); */

const Button = (props) => (
  <>
    <button
      {...props}
      className={`button ${props.className}`}
      type={`${props.type}`}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  </>
);

Button.propTypes = {
  loading: PropsType.bool,
  className: PropsType.string,
  children: PropsType.node.isRequired,
  type: PropsType.string,
  onClick: PropsType.func,
  disabled: PropsType.bool,
};

Button.defaultProps = {
  loading: false,
  className: "btn",
  type: "button",
  disabled: false,
  onClick: null,
};

export default Button;
