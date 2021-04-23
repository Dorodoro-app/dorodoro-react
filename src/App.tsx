import "./App.css";
import { useState, useRef, useEffect } from "react";

import Timer from "./componenents/Timer";
import Settings from "./componenents/Settings";

function App() {
  const alarmAudio = useRef<HTMLAudioElement>(null);
  const [timerType, setTimerType] = useState("Pomodoro");
  const [noOfPomodoros, setNoOfPomodoros] = useState(1);
  const [pomodoroLength, setPomodoroLength] = useState(60 * 25);
  const [shortBreakLength, setShortBreakLength] = useState(60 * 5);
  const [longBreakLength, setLongBreakLength] = useState(60 * 15);
  const [alarmType, setAlarmType] = useState("Air Raid");
  const [startNextRound, setStartNextRound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroLength);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const isTimerStarted = intervalId !== null;

  // Decrease Timer Length by one minute
  const decreaseLengthByOneMinute = (
    currentTimeSetting: number,
    setTimeSetting: (currentTimeSetting: number) => void
  ) => {
    const newTimeLength = currentTimeSetting - 60;

    if (newTimeLength > 0) {
      setTimeSetting(newTimeLength);
    }
  };

  // Increase Timer Length by one minute
  const increaseLengthByOneMinute = (
    currentTimeSetting: number,
    setTimeSetting: (currentTimeSetting: number) => void
  ) => {
    const newTimeLength = currentTimeSetting + 60;
    if (newTimeLength <= 60 * 60) {
      setTimeSetting(currentTimeSetting + 60);
    }
  };

  // Start or Pause Timer
  const startPauseTimer = () => {
    if (isTimerStarted) {
      // Change start timer to pause timer
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 10); // TODO: turn back into 1000
      setIntervalId(newIntervalId);
    }
  };

  const resetTimer = () => {
    // alarmAudio?.current?.load()
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setTimerType("Pomodoro");
    setTimeLeft(pomodoroLength);
    setPomodoroLength(pomodoroLength);
    setShortBreakLength(shortBreakLength);
    setLongBreakLength(longBreakLength);
  };

  useEffect(() => {
    if (pomodoroLength === 0) {
      setPomodoroLength(60);
    }
  }, [pomodoroLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerType === "Pomodoro" && noOfPomodoros === 2) {
        setTimerType("Long Break");
        setTimeLeft(longBreakLength);
        setNoOfPomodoros(1);
      } else if (timerType === "Pomodoro") {
        setTimerType("Short Break");
        setTimeLeft(shortBreakLength);
        setNoOfPomodoros(noOfPomodoros + 1);
      } else if (timerType === "Short Break" || timerType === "Long Break") {
        setTimerType("Pomodoro");
        setTimeLeft(pomodoroLength);
      }
      if (!startNextRound) startPauseTimer();
    } else if (timerType === "Pomodoro" && intervalId === null) {
      setTimeLeft(pomodoroLength);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    timeLeft,
    shortBreakLength,
    pomodoroLength,
    timerType,
    longBreakLength,
    noOfPomodoros,
    intervalId,
    startNextRound,
  ]);

  return (
    <div className="App">
      <Timer
        timeLeft={timeLeft}
        timerType={timerType}
        startPauseTimer={startPauseTimer}
        isTimerStarted={isTimerStarted}
      />

      <button id="reset" onClick={resetTimer}>
        Reset
      </button>

      <Settings
        decreaseLengthByOneMinute={decreaseLengthByOneMinute}
        increaseLengthByOneMinute={increaseLengthByOneMinute}
        pomodoroLength={pomodoroLength}
        setPomodoroLength={setPomodoroLength}
        shortBreakLength={shortBreakLength}
        setShortBreakLength={setShortBreakLength}
        longBreakLength={longBreakLength}
        setLongBreakLength={setLongBreakLength}
        alarmType={alarmType}
        setAlarmType={setAlarmType}
        startNextRound={startNextRound}
        setStartNextRound={setStartNextRound}
      />

      <audio id="alarm" ref={alarmAudio}>
        <source src="assets/BOMB_SIREN.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
