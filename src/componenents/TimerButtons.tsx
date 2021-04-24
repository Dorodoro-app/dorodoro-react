import React from "react";

const TimerButtons: React.FC<Props> = ({
  startPauseTimer,
  isTimerStarted,
  resetTimer,
}) => {
  return (
    <div>
      <button id="start-pause-buttons" onClick={startPauseTimer}>
        {isTimerStarted ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};

type Props = {
  isTimerStarted: boolean;
  startPauseTimer: () => void;
  resetTimer: () => void;
};

export default TimerButtons;
