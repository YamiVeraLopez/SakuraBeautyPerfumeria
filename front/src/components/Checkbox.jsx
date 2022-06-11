import React from "react";
import './styles/Checkbox.css'

export default function Checkbox({label, id, name, handler}) {
  return (    
      <div className="check">
        <input type="checkbox" id={id} name={name} handler/>
        <label htmlFor={id}>
            <div className="custom-checkbox">
                <span className="checked">✔</span>
            </div>
          <span className="custom-checkbox__text">
            {label}
          </span>
        </label>
      </div>
  );
}
