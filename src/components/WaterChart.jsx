import * as echarts from "echarts";
import "./WaterChart.css";
import { useEffect, useRef, useContext } from "react";
import { MQTTContext } from "../context/MQTTContext";

const WaterChart = () => {
  const { sensorData } = useContext(MQTTContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const sensors = ["Sensor 1", "Sensor 2", "Sensor 3"];
  const colors = ["#4B9CE2", "#9E77ED", "#F56C6C"];

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption({
        title: {
          text: "💧 실시간 수위 변화 시뮬레이션",
          left: "center",
          top: 10,
        },
        tooltip: { trigger: "axis" },
        legend: { data: sensors, top: 38 },
        grid: { top: 100, left: 60, right: 40, bottom: 40 },
        xAxis: {
          type: "category",
          data: [],
          name: "시간 (초)",
          boundaryGap: false,
        },
        yAxis: { type: "value", name: "수위 (cm)", nameGap: 25 },
        series: sensors.map((name, i) => ({
          name,
          type: "line",
          smooth: true,
          lineStyle: { color: colors[i] },
          data: [],
        })),
      });
    }

    const handleResize = () => {
      chartInstance.current && chartInstance.current.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption({
      xAxis: {
        type: "category",
        data: (sensorData.topic1 || []).map((d) => d.time),
      },
      series: [
        { data: sensorData.topic1.map((d) => d.value) },
        { data: sensorData.topic2.map((d) => d.value) },
        { data: sensorData.topic3.map((d) => d.value) },
      ],
    });
  }, [sensorData]);

  return <div className="WaterChart" ref={chartRef}></div>;
};

export default WaterChart;
