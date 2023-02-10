import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setStrength(checkPasswordStrength(event.target.value));
  };

  const checkPasswordStrength = password => {
    let strength = 0;

    if (password.length < 6) {
      return "Too short";
    }

    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?]+/)) {
      strength += 1;
    }

    switch (strength) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        return "";
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <br />
      <p>Password strength: {strength}</p>
    </div>
  );
};

export default PasswordStrengthChecker;
