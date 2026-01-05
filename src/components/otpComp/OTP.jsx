import React, { useRef, useState } from "react";

export const OTPInput = ({
  length = 6,
  onComplete = () => {
    console.log("complete");
  },
}) => {
  // State to store the OTP value (each digit as an array element)
  const [otp, setOtp] = useState(new Array(length).fill(""));
  // Ref array to store references to each individual input element
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === "") {
      // Only allow digits or empty string
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if a digit is entered and it's not the last input
      if (value !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete function if all digits are filled
      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to the previous input on backspace if current is empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [
        ...pastedData.split(""),
        ...new Array(length - pastedData.length).fill(""),
      ].slice(0, length);
      setOtp(newOtp);
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="otp-input-container" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text" // Use "text" for better cross-browser compatibility with input modes and paste
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          // Assign ref to the input element in the array
          ref={(el) => (inputRefs.current[index] = el)}
          className="otp-input-box"
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            margin: "0 5px",
          }}
        />
      ))}
    </div>
  );
};
