import "./App.css";
import { useState, useRef, useEffect } from "react";

import Timer from "./componenents/Timer";

function App() {
  const alarmAudio = useRef(null);
  const [timerLength, setTimerLength] = useState(60 * 25);
  const [pomodoroLength, setPomodoroLength] = useState(60 * 25);
  const [timerType, setTimerType] = useState("Pomodoro");
  const [shortBreakLength, setShortBreakLength] = useState(60 * 5);
  const [longBreakLength, setLongBreakLength] = useState(60 * 15);
  const [intervalId, setIntervalId] = useState(null);
  const isTimerStarted = intervalId !== null;

  useEffect(() => {
    if (timerLength === 0) {
      if (timerType === "Pomodoro") {
        setTimerType("Short Break");
        setTimerLength(shortBreakLength);
      } else if (timerType === "Short Break") {
        setTimerType("Pomodoro");
        setTimerLength(pomodoroLength);
      }
    }
  }, [timerLength, shortBreakLength, pomodoroLength, timerType]);

  // Decrease Timer Length by one minute
  const decreaseLengthByOneMinute = () => {
    const newLength = timerLength - 60;

    if (newLength > 0) {
      setTimerLength(newLength);
    }
  };

  // Increase Timer Length by one minute
  const increaseLengthByOneMinute = () => {
    const newTimeLength = timerLength + 60;
    if (newTimeLength <= 60 * 60) {
      setTimerLength(timerLength + 60);
    }
  };

  // Start or Pause Timer
  const startPauseTimer = () => {
    if (isTimerStarted) {
      // Change start timer to pause timer
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // Decrease timer by one second
      const newIntervalId = setInterval(() => {
        setTimerLength((prevTimeLength) => {
          const currentTime = prevTimeLength - 1;

          if (currentTime >= 0) {
            return currentTime;
          }

          // alarmAudio.current.play()
        });
      }, 10);
      setIntervalId(newIntervalId);
    }
  };

  const resetTimer = () => {
    // alarmAudio.current.load()
    clearInterval(intervalId);
    setIntervalId(null);
    setTimerType("Pomodoro");
    setTimerLength(60 * 25);
    setShortBreakLength(60 * 5);
    setLongBreakLength(60 * 5);
  };

  return (
    <div className="App">
      <Timer
        timerLength={timerLength}
        setTimerLength={setTimerLength}
        timerType={timerType}
        setTimerType={setTimerType}
        shortBreakLength={shortBreakLength}
        longBreakLength={longBreakLength}
        decreaseLengthByOneMinute={decreaseLengthByOneMinute}
        increaseLengthByOneMinute={increaseLengthByOneMinute}
        intervalId={intervalId}
        startPauseTimer={startPauseTimer}
        isTimerStarted={isTimerStarted}
      />

      <button id="reset" onClick={resetTimer}>
        Reset
      </button>

      <audio id="alarm" ref={alarmAudio}>
        <source src="assets/BOMB_SIREN.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
