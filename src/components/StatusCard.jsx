import "./StatusCard.css";
import { useContext } from "react";
import { OpenContext } from "../pages/Control";
import { WaterThresholdContext } from "../App";
import { ControlTimeContext } from "../pages/Control";
import { toTwoDigits } from "../utils/dateUtils";
import { GiOpenGate, GiClosedDoors } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { IoTime } from "react-icons/io5";

const StatusCard = () => {
  const waterThreshold = useContext(WaterThresholdContext);
  const isOpen = useContext(OpenContext);
  const lastControlTime = useContext(ControlTimeContext);

  return (
    <div className="StatusCard">
      <p className="statusCard_title">현재 상태 요약</p>
      <div className="statusCard_subtitle">
        <p className="barrierStaus">
          <span className={`status_icon_open_${isOpen}`}>
            {isOpen ? <GiOpenGate /> : <GiClosedDoors />}
          </span>
          <span className="subtitle_text"> 물막이판 상태</span>:
          <span className="status">{isOpen ? " 열림" : " 닫힘"}</span>
        </p>
        <p className="waterStatus">
          <span className="status_icon_water">
            <IoIosWater />
          </span>
          <span className="subtitle_text"> 현재 수위</span>:
          {` ${waterThreshold}cm`}
        </p>
        <p className="lastControl">
          <span className="control_icon">
            <IoTime />
          </span>
          <span className="subtitle_text"> 마지막 제어</span>:
          {lastControlTime
            ? ` ${lastControlTime.getFullYear()}.${toTwoDigits(
                lastControlTime.getMonth() + 1
              )}.${toTwoDigits(lastControlTime.getDay())} ${toTwoDigits(
                lastControlTime.getHours()
              )}:${toTwoDigits(lastControlTime.getMinutes())}`
            : " 기록 없음"}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
