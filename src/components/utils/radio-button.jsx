import React from "react";

const RadioButton = (props) => {
  let { onChange, label, value, name,className } = props;

  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        checked={value}
        value={value}
        name={name}
        id={`rb${name}`}
        onChange={onChange}
      />
      <label className={`btn btn-outline-secondary ${className}`} htmlFor={`rb${name}`}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
