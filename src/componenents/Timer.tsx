import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

// @ts-ignore
momentDurationFormatSetup(moment);

const Timer: React.FC<Props> = ({
  timeLeft,
  timerType,
  startPauseTimer,
  isTimerStarted
}) => {
  const displayTime = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });
  return (
    <div id="timer">
      <p id="timer-type">{timerType}</p>
      <p id="timer-clock">{displayTime}</p>
      <button id="start-pause-buttons" onClick={startPauseTimer}>
        {isTimerStarted ? "Pause" : "Start"}
      </button>
    </div>
  );
};

type Props = {
  timeLeft: number
  timerType: string
  startPauseTimer: () => void
  isTimerStarted: boolean
}

export default Timer;
