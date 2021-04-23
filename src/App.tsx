import "./App.css";
import { useState, useEffect } from "react";

import Timer from "./componenents/Timer";
import Settings from "./componenents/Settings";

function App() {
  const [timerType, setTimerType] = useState("Pomodoro");
  const [noOfPomodoros, setNoOfPomodoros] = useState(1);
  const [pomodoroLength, setPomodoroLength] = useState(60 * 1);
  const [shortBreakLength, setShortBreakLength] = useState(60 * 1);
  const [longBreakLength, setLongBreakLength] = useState(60 * 1);
  const [startNextRound, setStartNextRound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroLength);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const isTimerStarted = intervalId !== null;
  const alarmTypes = ["Air Raid", "Chime", "Huricane Warning"];
  const [currentAlarmType, setCurrentAlarmType] = useState("None");
  const urls = [
    "http://soundbible.com/grab.php?id=2056&type=mp3",
    "http://soundbible.com/grab.php?id=2218&type=mp3",
    "http://soundbible.com/grab.php?id=1937&type=mp3",
  ];

  // Map alarm type to url
  //TODO Get URLS and alarm types from backend
  const [audioSources] = useState(
    Object.fromEntries(
      alarmTypes.map((_, i) => [alarmTypes[i], new Audio(urls[i])])
    )
  );

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

  // Reset everything on button press
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
    if (currentAlarmType !== "None") audioSources[currentAlarmType].pause();
  };

  // Set minimum
  useEffect(() => {
    if (pomodoroLength === 0) {
      setPomodoroLength(60);
    } else if (shortBreakLength === 0) {
      setShortBreakLength(60);
    } else if (longBreakLength === 0) {
      setLongBreakLength(60);
    }
  }, [pomodoroLength, shortBreakLength, longBreakLength]);

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
      if (currentAlarmType !== "None") audioSources[currentAlarmType].play();
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
        currentAlarmType={currentAlarmType}
        setCurrentAlarmType={setCurrentAlarmType}
        startNextRound={startNextRound}
        setStartNextRound={setStartNextRound}
        alarmTypes={alarmTypes}
      />
    </div>
  );
}

export default App;
