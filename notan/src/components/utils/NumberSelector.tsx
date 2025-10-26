import React, { useRef } from "react";

interface props {
  value: number;
  increase: () => void;
  decrease: () => void;
}

const NumberSelector: React.FC<props> = ({ value, increase, decrease }) => {
  const timeoutRef = useRef<number | null>(null);
  const speedRef = useRef<number>(350);
  const actionRef = useRef<() => void>(() => {});

  const holdAction = () => {
    actionRef.current();
    speedRef.current = Math.max(50, speedRef.current - 20);

    timeoutRef.current = window.setTimeout(holdAction, speedRef.current);
  };

  const startHold = (action: () => void) => {
    actionRef.current = action;
    speedRef.current = 350;
    holdAction();
  };

  const stopHold = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <>
      <div className="component_number_selector">
        <button
          className={
            value > 1
              ? "component_number_selector_decreaser_active"
              : "component_number_selector_decreaser_inactive"
          }
          onMouseDown={() => startHold(decrease)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(decrease)}
          onTouchEnd={stopHold}
        >
          -
        </button>

        <h1 className="component_number_selector_display">{value}</h1>

        <button
          className={
            value < 60
              ? "component_number_selector_increaser_active"
              : "component_number_selector_increaser_inactive"
          }
          onMouseDown={() => startHold(increase)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={() => startHold(increase)}
          onTouchEnd={stopHold}
        >
          +
        </button>
      </div>
    </>
  );
};

export default NumberSelector;
