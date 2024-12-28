import React from "react";
import Calendar from "./components/Calendar";

const App = () => {
  const now = new Date(); // Текущая дата
  return (
    <div>
      <Calendar date={now} />
    </div>
  );
};

export default App;
