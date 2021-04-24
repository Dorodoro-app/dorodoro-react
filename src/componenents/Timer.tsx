import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

// @ts-ignore
momentDurationFormatSetup(moment);

const Timer: React.FC<Props> = ({
  timeLeft,
  timerType,
}) => {
  const displayTime = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });
  return (
    <div id="timer">
      <p id="timer-type">{timerType}</p>
      <p id="timer-clock">{displayTime}</p>
    </div>
  );
};

type Props = {
  timeLeft: number;
  timerType: string;
};

export default Timer;
