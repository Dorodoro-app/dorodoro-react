import React from "react";

const History: React.FC<Props> = ({ datesWithTotalPomodoros }) => {
  const datesArray = Object.keys(datesWithTotalPomodoros);
  return (
    <div id="history-date-box">
      {datesArray.map((object, i) => (
        <div key={i}>
          <h3 id="history-date-heading">{object}</h3>
          <p id="history-date-pomodoro-count">
            Pomodoros Completed - {datesWithTotalPomodoros[object]}
          </p>
        </div>
      ))}
    </div>
  );
};

type Props = {
  datesWithTotalPomodoros: Object;
};

export default History;
