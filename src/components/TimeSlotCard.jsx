import "./TimeSlotCard.css";
import { getOnOffImage } from "../utils/get-onoff-image";
const TimeSlotCard = ({ startHour, endHour, status }) => {
  return (
    <div className="TimeSlotCard">
      <div className="timeSlotCard_time">{`${startHour} ~ ${endHour}시`}</div>
      <div className="timeSlotCard_status">
        <img className="status_img" src={getOnOffImage(status ? 1 : 0)} />
        <span>{status ? "닫힘" : "열림"}</span>
      </div>
    </div>
  );
};

export default TimeSlotCard;
