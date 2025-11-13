import { createContext, useEffect, useState, useContext } from "react";
import { Client } from "paho-mqtt";
import { TIME_BLOCKS } from "../utils/constants";
import { WaterThresholdContext } from "../App";
export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
  const waterThreshold = useContext(WaterThresholdContext);
  const [sensorData, setSensorData] = useState({
    topic1: [],
    topic2: [],
    topic3: [],
  });

  const [statusByBlock, setStatusByBlock] = useState({
    "2025-11-07": {
      "00-03": false,
      "03-06": false,
      "06-09": true,
      "09-12": true,
      "12-15": true,
      "15-18": true,
      "18-21": false,
      "21-24": false,
    },
    "2025-11-08": {
      "00-03": false,
      "03-06": false,
      "06-09": false,
      "09-12": true,
      "12-15": true,
      "15-18": false,
      "18-21": false,
      "21-24": false,
    },
  });

  const getTimeBlock = (date) => {
    const hour = date.getHours();
    const start = Math.floor(hour / 3) * 3;
    const end = start + 3;
    return `${String(start).padStart(2, "0")}-${String(end).padStart(2, "0")}`;
  };

  const createEmptyDayBlocks = () => {
    const blocks = {};
    TIME_BLOCKS.forEach((b) => (blocks[b] = true));
    return blocks;
  };

  useEffect(() => {
    const storedSensorData = localStorage.getItem("sensorData");
    const storedBlockData = localStorage.getItem("blockData");
    if (storedSensorData) {
      setSensorData(JSON.parse(storedSensorData));
    }
    if (storedBlockData) {
      setStatusByBlock(JSON.parse(storedBlockData));
    }

    const clientId = "reactClient_" + Math.random().toString(16).substr(2, 8);
    const client = new Client(import.meta.env.VITE_MQTT_URL, clientId);
    client.connect({
      userName: import.meta.env.VITE_MQTT_USERNAME,
      password: import.meta.env.VITE_MQTT_PASSWORD,
      useSSL: true,
      onSuccess: () => {
        console.log("Connected to EMQX Cloud");
        client.subscribe("water_level/topic1");
        client.subscribe("water_level/topic2");
        client.subscribe("water_level/topic3");
      },
      onFailure: (err) => console.error("Connection failed:", err.errorMessage),
    });

    client.onMessageArrived = (msg) => {
      const topic = msg.destinationName;
      const payloadStr = msg.payloadString;

      try {
        const payload = JSON.parse(payloadStr);
        const { timestamp, value } = payload;

        const dateObj = new Date(timestamp * 1000);
        const date = dateObj.toISOString().split("T")[0];
        const time = dateObj.toTimeString().split(" ")[0];
        const block = getTimeBlock(dateObj);

        const key = topic.split("/")[1];

        setSensorData((prev) => ({
          ...prev,
          [key]: [...prev[key], { date, time, block, value }].slice(-100),
        }));

        setStatusByBlock((prev) => {
          const dayBlocks = { ...(prev[date] || createEmptyDayBlocks()) };

          if (Number(value) >= waterThreshold) {
            dayBlocks[block] = true;
          }

          return {
            ...prev,
            [date]: dayBlocks,
          };
        });
      } catch (err) {
        console.error("유효하지 않은 JSON 입니다:", msg.payloadString);
      }
    };

    return () => {
      if (client.isConnected()) client.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sensorData", JSON.stringify(sensorData));
  }, [sensorData]);

  useEffect(() => {
    localStorage.setItem("blockData", JSON.stringify(statusByBlock));
  }, [statusByBlock]);

  return (
    <MQTTContext.Provider
      value={{ sensorData, statusByBlock, setStatusByBlock }}
    >
      {children}
    </MQTTContext.Provider>
  );
};
