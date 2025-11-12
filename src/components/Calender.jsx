import "./Calender.css";
import { useState, createContext, useEffect } from "react";
import PaginationBar from "./PaginationBar";
import TimeSlotBoard from "./TimeSlotBoard";
export const DatesContext = createContext();
export const DatesDispatchContext = createContext();
import { YEAR } from "../utils/constants";

const Calender = () => {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const [dates, setDates] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const baseDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = baseDate.getDay();

    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - ((dayOfWeek + 6) % 7));

    const offsetMonday = new Date(monday);
    offsetMonday.setDate(monday.getDate() + weekOffset * 7);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(offsetMonday);
      d.setDate(offsetMonday.getDate() + i);
      return d;
    });

    setDates(weekDates);
  }, [weekOffset, date]);

  const onUpdateOffSet = (value) => setWeekOffset((pre) => pre + value);
  const onUpdateDate = ({ year, month, day }) => {
    setDate({ year: year, month: month, day: day });
    setWeekOffset(0);
  };

  const onUpdateYear = (year) => {
    setYear(year);
    onUpdateDate({
      ...date,
      year,
    });
  };

  return (
    <DatesContext.Provider value={{ date, dates }}>
      <DatesDispatchContext.Provider value={{ onUpdateOffSet, onUpdateDate }}>
        <div className="Calender">
          <div className="calender_wrapper">
            <div className="calender_select_wrapper">
              <div className="calender_select_year">
                <select
                  value={year}
                  onChange={(e) => onUpdateYear(Number(e.target.value))}
                  className="select"
                >
                  {YEAR.map((item, id) => (
                    <option key={id} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="calender_month">{date.month}월</div>
              <div className="calender_select_day">
                <PaginationBar />
              </div>
            </div>
            <div className="calender_view">
              <TimeSlotBoard />
            </div>
          </div>
        </div>
      </DatesDispatchContext.Provider>
    </DatesContext.Provider>
  );
};

export default Calender;
