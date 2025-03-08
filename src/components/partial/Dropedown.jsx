import React from "react";

const Dropedown = ({ title, options, func }) => {
  return (
    <div className="custom-select">
      <select defaultValue="0" name="format" onChange={func} id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropedown;
