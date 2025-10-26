import React from "react";

interface props {
  select: boolean;
  setSelect: (select: boolean) => void;
}

const ToggleSwitch: React.FC<props> = ({ select, setSelect }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={select}
        onClick={() => setSelect(!select)}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
