/* eslint-disable react/prop-types */
// import { useState } from "react";

const ProgressBar = ({ width = null, height = null, progress, children }) => {
  const renderColor = (val) => {
    if (val < 50) {
      return "#74F399";
    } else if (val > 50 && val < 95) {
      return "#F3C176";
    } else {
      return "#E38080";
    }
  };

  const styles = {
    width: `40px`,
    height: `40px`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    background: `conic-gradient(${renderColor(
      progress
    )} ${progress}%, 0, #ecf0f1 ${(100 - parseInt(progress)).toString()}%)`,
    borderRadius: `50%`,
  };

  return (
    <>
      <div className="progress-bar" style={styles}>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `#fff`,
            height: `80%`,
            width: `80%`,
            borderRadius: `50%`,
            boxShadow: `0px 0px 7px 0px rgba(0, 0, 0, 0.1)`,
          }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
