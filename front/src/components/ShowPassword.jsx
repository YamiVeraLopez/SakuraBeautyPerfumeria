import React, { useState } from "react";

export default function ShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [iconEye, setIconEye] = useState("./img/icons/EyeClosed.svg");

  function showOrHidden() {

    let password = document.querySelector("#password");

    if (showPassword) {

      setShowPassword(false);
      setIconEye("./img/icons/EyeClosed.svg");
      if (password.type === "text") {
        password.type = "password";
      }

    } else {

      setShowPassword(true);
      setIconEye("./img/icons/eye.svg");
      if (password.type === "password") {
        password.type = "text";
      }
         
    }
  }

  return (
    <div className="showOrHiddenPassword icon" onClick={showOrHidden}>
      <img src={iconEye} alt="icon" />
    </div>
  );
}
