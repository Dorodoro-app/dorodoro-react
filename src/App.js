import "./App.css";
import { useState, useRef, useEffect } from "react";

import Timer from "./componenents/Timer";

function App() {
  const alarmAudio = useRef(null);
  const [timeLeft, setTimeLeft] = useState(60 * 25);
  const [timerType, setTimerType] = useState("Pomodoro");
  const [noOfPomodoros, setNoOfPomodoros] = useState(0);
  const [pomodoroLength, setPomodoroLength] = useState(60 * 25);
  const [shortBreakLength, setShortBreakLength] = useState(60 * 5);
  const [longBreakLength, setLongBreakLength] = useState(60 * 15);
  const [intervalId, setIntervalId] = useState(null);
  const isTimerStarted = intervalId !== null;

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerType === "Pomodoro" && noOfPomodoros === 1) {
        setTimerType("Long Break");
        setTimeLeft(longBreakLength);
        setNoOfPomodoros(0)
      } else if (timerType === "Pomodoro") {
        setTimerType("Short Break");
        setTimeLeft(shortBreakLength);
        setNoOfPomodoros(noOfPomodoros+1)
      } else if (timerType === "Short Break" || timerType === "Long Break") {
        setTimerType("Pomodoro");
        setTimeLeft(pomodoroLength);
      } 
      // else if (timerType === "Long Break") {
      //   setTimerType("Pomodoro");
      //   setTimeLeft(pomodoroLength);
      // }

    }
  }, [timeLeft, shortBreakLength, pomodoroLength, timerType, longBreakLength, noOfPomodoros]);

  // Decrease Timer Length by one minute
  const decreaseLengthByOneMinute = () => {
    const newLength = timeLeft - 60;

    if (newLength > 0) {
      setTimeLeft(newLength);
    }
  };

  // Increase Timer Length by one minute
  const increaseLengthByOneMinute = () => {
    const newTimeLength = timeLeft + 60;
    if (newTimeLength <= 60 * 60) {
      setTimeLeft(timeLeft + 60);
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
        setTimeLeft((prevTimeLength) => {
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
    setTimeLeft(60 * 25);
    setPomodoroLength(60 * 25);
    setShortBreakLength(60 * 5);
    setLongBreakLength(60 * 5);
  };

  return (
    <div className="App">
      <Timer
        timeLeft={timeLeft}
        timerType={timerType}
        setTimerType={setTimerType}
        decreaseLengthByOneMinute={decreaseLengthByOneMinute}
        increaseLengthByOneMinute={increaseLengthByOneMinute}
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
