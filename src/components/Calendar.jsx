import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru"; // Русская локализация Moment.js
import "../App.css";

const Calendar = ({ date }) => {
  moment.locale("ru"); // Установка русского языка

  // Форматируем дату
  const dayOfWeek = moment(date).format("dddd"); // День недели
  const dayOfMonth = moment(date).format("D"); // Число
  const monthName = moment(date).format("MMMM"); // Название месяца
  const year = moment(date).format("YYYY"); // Год
  const monthStart = moment(date).startOf("month"); // Начало месяца
  const monthEnd = moment(date).endOf("month"); // Конец месяца
  const calendarStart = monthStart.startOf("week"); // Начало календаря
  const calendarEnd = monthEnd.endOf("week"); // Конец календаря

  // Генерация дней для календаря
  const days = [];
  let currentDay = calendarStart.clone();
  while (currentDay.isBefore(calendarEnd, "day")) {
    days.push(currentDay.clone());
    currentDay.add(1, "day");
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{dayOfMonth}</div>
          <div className="ui-datepicker-material-month">{monthName}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthName}</span>&nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
              <th key={day} scope="col">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: days.length / 7 }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {days
                .slice(weekIndex * 7, weekIndex * 7 + 7)
                .map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={
                      day.isSame(date, "day")
                        ? "ui-datepicker-today"
                        : !day.isSame(date, "month")
                        ? "ui-datepicker-other-month"
                        : ""
                    }
                  >
                    {day.format("D")}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Calendar;
