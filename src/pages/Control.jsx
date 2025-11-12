import "./Control.css";
import Button from "../components/Button";
import { useState, useContext, useEffect, createContext } from "react";
import { MQTTContext } from "../context/MQTTContext";
import { TOPICS } from "../utils/constants";
import StatusCard from "../components/StatusCard";
import BarrierControl from "../components/control/BarrierControl";
import WaterControl from "../components/control/WaterControl";
import { Canvas } from "@react-three/fiber";
import ThreeDWater from "../components/threeD/ThreeDWater";
import ThreeDGate from "../components/threeD/ThreeDGate";
import { WaterThresholdContext } from "../App";

export const OpenContext = createContext();
export const OpenDispatchContext = createContext();
export const AutoContext = createContext();
export const AutoDispatchContext = createContext();
export const ControlTimeContext = createContext();
export const ControlTimeDispatchContext = createContext();

const Control = () => {
  const [lastControlTime, setLastControlTime] = useState(null);
  const [isWater, setIsWater] = useState(false);
  const [isAutomaticControl, setIsAutomaticControl] = useState(true);
  const waterThreshold = useContext(WaterThresholdContext);

  const { sensorData } = useContext(MQTTContext);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const storedOpenData = localStorage.getItem("open");
    const storedAutoData = localStorage.getItem("auto");
    if (storedOpenData) setIsOpen(JSON.parse(storedOpenData));
    if (storedAutoData) setIsAutomaticControl(JSON.parse(storedAutoData));
  }, []);

  useEffect(() => {
    localStorage.setItem("auto", isAutomaticControl);
  }, [isAutomaticControl]);
  useEffect(() => {
    localStorage.setItem("open", isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isAutomaticControl) return;
    const shouldClose = TOPICS.some((topic) => {
      const latestValue =
        sensorData[topic]?.[sensorData[topic].length - 1]?.value || 0;
      return latestValue >= waterThreshold;
    });

    setIsOpen(!shouldClose);
  }, [sensorData]);

  return (
    <div className="Control">
      <div className="control_button">
        <Button
          onClick={() => setIsWater(false)}
          text={"물막이판 제어"}
          type={"barrier_control"}
          isActive={isWater === false}
        />
        <Button
          onClick={() => setIsWater(true)}
          text={"수위계 제어"}
          type={"water_control"}
          isActive={isWater === true}
        />
      </div>

      <ControlTimeContext.Provider value={lastControlTime}>
        <ControlTimeDispatchContext.Provider value={{ setLastControlTime }}>
          <AutoContext.Provider value={isAutomaticControl}>
            <AutoDispatchContext.Provider value={{ setIsAutomaticControl }}>
              <OpenContext.Provider value={isOpen}>
                <OpenDispatchContext.Provider value={{ setIsOpen }}>
                  <div className="control_threeD">
                    <div className="threeD_view">
                      <Canvas shadows>
                        {isWater ? <ThreeDWater /> : <ThreeDGate />}
                      </Canvas>
                    </div>
                    <div className="threeD_controller">
                      {isWater ? <WaterControl /> : <BarrierControl />}
                    </div>
                    <div className="threeD_status">
                      <StatusCard waterGauge={13} />
                    </div>
                  </div>
                </OpenDispatchContext.Provider>
              </OpenContext.Provider>
            </AutoDispatchContext.Provider>
          </AutoContext.Provider>
        </ControlTimeDispatchContext.Provider>
      </ControlTimeContext.Provider>
    </div>
  );
};

export default Control;
