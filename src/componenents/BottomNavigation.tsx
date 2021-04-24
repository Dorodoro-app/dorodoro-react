import React from "react";

import Settings from "./Settings";

const BottomNavigation: React.FC<Props> = ({
  decreaseLengthByOneMinute,
  increaseLengthByOneMinute,
  pomodoroLength,
  shortBreakLength,
  longBreakLength,
  setPomodoroLength,
  setShortBreakLength,
  setLongBreakLength,
  currentAlarmType,
  startNextRound,
  setCurrentAlarmType,
  setStartNextRound,
  alarmTypes,
}) => {
  return (
    <div>
      {/* prettier-ignore */}
      <nav>
        <ul>
          <a href="/settings">Settings</a>&nbsp;&nbsp;
          <a href="/history">History</a>
        </ul>
      </nav>
      <Settings
        decreaseLengthByOneMinute={decreaseLengthByOneMinute}
        increaseLengthByOneMinute={increaseLengthByOneMinute}
        pomodoroLength={pomodoroLength}
        setPomodoroLength={setPomodoroLength}
        shortBreakLength={shortBreakLength}
        setShortBreakLength={setShortBreakLength}
        longBreakLength={longBreakLength}
        setLongBreakLength={setLongBreakLength}
        currentAlarmType={currentAlarmType}
        setCurrentAlarmType={setCurrentAlarmType}
        startNextRound={startNextRound}
        setStartNextRound={setStartNextRound}
        alarmTypes={alarmTypes}
      />
    </div>
  );
};

type Props = {
  decreaseLengthByOneMinute: (
    currentTimeSetting: number,
    setTimeSetting: (currentTimeSetting: number) => void
  ) => void;
  increaseLengthByOneMinute: (
    currentTimeSetting: number,
    setTimeSetting: (currentTimeSetting: number) => void
  ) => void;

  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  currentAlarmType: string;
  startNextRound: boolean;
  alarmTypes: Array<string>;

  setPomodoroLength: (newLength: number) => void;
  setShortBreakLength: (newLength: number) => void;
  setLongBreakLength: (newLength: number) => void;
  setCurrentAlarmType: (newAlarm: string) => void;
  setStartNextRound: (newStartNextRoundValue: boolean) => void;
};

export default BottomNavigation;
