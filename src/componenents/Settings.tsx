import React from "react";

const Settings: React.FC<Props> = ({
  decreaseLengthByOneMinute,
  increaseLengthByOneMinute,
  pomodoroLength,
  shortBreakLength,
  longBreakLength,
  setPomodoroLength,
  setShortBreakLength,
  setLongBreakLength,
  alarmType,
  startNextRound,
  setAlarmType,
  setStartNextRound,
}) => {
  return (
    <div id="settings">
      <hr></hr>
      <div id="settings-option">
        <label>
          Pomodoro
          <input
            type="text"
            value={pomodoroLength / 60}
            onChange={(event) =>
              setPomodoroLength(
                pomodoroLength > 0 ? Number(event.target.value) * 60 : 60
              )
            }
          />
          <button
            id="plus-minus-buttons"
            onClick={() =>
              increaseLengthByOneMinute(pomodoroLength, setPomodoroLength)
            }
          >
            +
          </button>
          <button
            id="plus-minus-buttons"
            onClick={() =>
              decreaseLengthByOneMinute(pomodoroLength, setPomodoroLength)
            }
          >
            -
          </button>
        </label>
      </div>
      <div id="settings-option">
        <label>
          Short Break Length
          <input
            type="text"
            value={shortBreakLength / 60}
            onChange={(event) =>
              setShortBreakLength(
                shortBreakLength > 0 ? Number(event.target.value) * 60 : 60
              )
            }
          />
          <button
            id="plus-minus-buttons"
            onClick={() =>
              increaseLengthByOneMinute(shortBreakLength, setShortBreakLength)
            }
          >
            +
          </button>
          <button
            id="plus-minus-buttons"
            onClick={() =>
              decreaseLengthByOneMinute(shortBreakLength, setShortBreakLength)
            }
          >
            -
          </button>
        </label>
      </div>
      <div id="settings-option">
        <label>
          Long Break Length
          <input
            type="text"
            value={longBreakLength / 60}
            onChange={(event) =>
              setLongBreakLength(
                longBreakLength > 0 ? Number(event.target.value) * 60 : 60
              )
            }
          />
          <button
            id="plus-minus-buttons"
            onClick={() =>
              increaseLengthByOneMinute(longBreakLength, setLongBreakLength)
            }
          >
            +
          </button>
          <button
            id="plus-minus-buttons"
            onClick={() =>
              decreaseLengthByOneMinute(longBreakLength, setLongBreakLength)
            }
          >
            -
          </button>
        </label>
      </div>

      <div id="settings-option">
        <label>
          Alarm type
          <select
            value={alarmType}
            onChange={(event) => setAlarmType(event.target.value)}
          >
            <option value="Air Raid">Air Raid</option>
            <option value="Chime">Chime</option>
            <option value="Huricane Warning">Huricane Warning</option>
            <option value="None">None</option>
          </select>
        </label>
      </div>
      <div id="settings-option">
        <label>
          Start Next Round Automatically
          <input
            name="Start Next Round Automatically"
            type="checkbox"
            checked={startNextRound}
            onChange={(event) => setStartNextRound(!startNextRound)}
          />
        </label>
      </div>
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
  alarmType: string;
  startNextRound: boolean;

  setPomodoroLength: (newLength: number) => void;
  setShortBreakLength: (newLength: number) => void;
  setLongBreakLength: (newLength: number) => void;
  setAlarmType: (newAlarm: string) => void;
  setStartNextRound: (newStartNextRoundValue: boolean) => void;
};

export default Settings;
