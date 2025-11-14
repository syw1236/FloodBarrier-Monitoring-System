import * as echarts from "echarts";
import "./WaterChart.css";
import React, { useEffect, useRef, useContext } from "react";
import { MQTTContext } from "../context/MQTTContext";

const WaterChart = () => {
  const { sensorData } = useContext(MQTTContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const sensors = ["Sensor 1", "Sensor 2", "Sensor 3"];
  const colors = ["#4B9CE2", "#9E77ED", "#F56C6C"];
  const firstLoad = useRef(true);

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

    const chart = chartInstance.current;
    const option = chart.getOption();

    if (firstLoad.current) {
      option.xAxis[0].data = sensorData.topic1.map((d) => d.time);
      option.series[0].data = sensorData.topic1.map((d) => d.value);
      option.series[1].data = sensorData.topic2.map((d) => d.value);
      option.series[2].data = sensorData.topic3.map((d) => d.value);

      chart.setOption(option);

      firstLoad.current = false;
      return;
    }

    const t1 = sensorData.topic1;
    if (t1.length > 0) {
      const latest = t1[t1.length - 1];
      option.xAxis[0].data.push(latest.time);
      option.series[0].data.push(latest.value);
    }

    const t2 = sensorData.topic2;
    if (t2.length > 0) {
      const latest = t2[t2.length - 1];
      option.series[1].data.push(latest.value);
    }

    const t3 = sensorData.topic3;
    if (t3.length > 0) {
      const latest = t3[t3.length - 1];
      option.series[2].data.push(latest.value);
    }

    chart.setOption(option);
  }, [sensorData]);

  return <div className="WaterChart" ref={chartRef}></div>;
};

export default React.memo(WaterChart);
