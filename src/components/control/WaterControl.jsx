import "./WaterControl.css";
import { useContext, useEffect, useRef } from "react";
import {
  WaterThresholdContext,
  WaterThresholdDispatchContext,
} from "../../App";
import { THRESHOLD } from "../../utils/constants";
import { ControlTimeDispatchContext } from "../../pages/Control";

const WaterControl = () => {
  const { setLastControlTime } = useContext(ControlTimeDispatchContext);
  const waterValue = useContext(WaterThresholdContext);
  const { setWaterThreshold } = useContext(WaterThresholdDispatchContext);
  const sliderRef = useRef(null);

  const getThumbColor = (value) => {
    const ratio = (value - THRESHOLD.min) / (THRESHOLD.max - THRESHOLD.min);
    const r = Math.round(168 + (0 - 168) * ratio);
    const g = Math.round(216 + (47 - 216) * ratio);
    const b = Math.round(255 + (108 - 255) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const onChangeSlider = (e) => {
    setWaterThreshold(Number(e.target.value));
    setLastControlTime(new Date());
  };

  useEffect(() => {
    const color = getThumbColor(waterValue);
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--thumb-color", color);
    }
  }, [waterValue]);

  return (
    <div className="WaterControl">
      <div className="threeD_controller">
        <div className="range_number">
          <span>{THRESHOLD.min}</span>
          <span>{(THRESHOLD.min + THRESHOLD.max) / 2}</span>
          <span>{THRESHOLD.max}</span>
        </div>
        <input
          ref={sliderRef}
          type="range"
          min={THRESHOLD.min}
          max={THRESHOLD.max}
          value={waterValue}
          step={1}
          className="slider"
          onChange={onChangeSlider}
        />
      </div>
    </div>
  );
};

export default WaterControl;
