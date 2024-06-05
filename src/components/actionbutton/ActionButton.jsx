import React from "react";

const ActionButton = ({ title, color, hover, onClick }) => {
  return (
    <button onClick={onClick}
      className={`w-full rounded-lg py-6 font-semibold ${color} ${hover}`}
    >
      {title}
    </button>
  );
};

export default ActionButton;
