import React from "react";
import { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Timer = ({
  timerLength,
  timerType,
  decreaseLengthByOneMinute,
  increaseLengthByOneMinute,
  startPauseTimer,
  isTimerStarted
}) => {
  const displayTime = moment
    .duration(timerLength, "s")
    .format("mm:ss", { trim: false });
  return (
    <div id="timer">
      <p id="timer-type">{timerType}</p>
      <p id="timer-clock">{displayTime}</p>
      <button id="start-pause-buttons" onClick={startPauseTimer}>
        {isTimerStarted ? "Pause" : "Start"}
      </button>
      <button id="plus-minus-buttons" onClick={increaseLengthByOneMinute}>
        +
      </button>
      <button id="plus-minus-buttons" onClick={decreaseLengthByOneMinute}>
        -
      </button>
    </div>
  );
};

export default Timer;
