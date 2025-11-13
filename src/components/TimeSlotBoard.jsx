import "./TimeSlotBoard.css";
import { getOnOffImage } from "../utils/get-onoff-image";
import { MQTTContext } from "../context/MQTTContext";
import { DatesContext } from "./Calender";
import { useContext } from "react";
import { toTwoDigits } from "../utils/dateUtils";
import TimeSlotCard from "./TimeSlotCard";

const TimeSlotBoard = () => {
  const { date } = useContext(DatesContext);
  const { statusByBlock, setStatusByBlock } = useContext(MQTTContext);
  const key = `${date.year}-${toTwoDigits(date.month)}-${toTwoDigits(
    date.day
  )}`;

  if (!statusByBlock[key]) {
    setStatusByBlock((prev) => ({
      ...prev,
      [key]: {
        "00-03": false,
        "03-06": false,
        "06-09": false,
        "09-12": false,
        "12-15": false,
        "15-18": false,
        "18-21": false,
        "21-24": false,
      },
    }));
  }

  return (
    <div className="TimeSlotBoard">
      <div className="timeSlotBoard_status">
        <img className="timeSlotBoard_img" src={getOnOffImage(1)} />
        <span className="status_string">켜짐</span>{" "}
        <span className="status_separator">|</span>{" "}
        <img className="timeSlotBoard_img" src={getOnOffImage(0)} />
        <span className="status_string">꺼짐</span>
      </div>

      <div className="timeSlotBoard_timeline">
        <div className="timeline_wrapper">
          {Object.entries(statusByBlock[key]).map(([time, status]) => {
            const [start, end] = time.split("-");
            return (
              <TimeSlotCard
                key={time}
                startHour={start}
                endHour={end}
                status={status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotBoard;
