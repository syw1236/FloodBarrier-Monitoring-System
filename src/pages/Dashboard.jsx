import FeatureShowCase from "../components/FeatureShowCase";
import { DETAILE_FEATURES } from "../utils/constants";
import WaterChart from "../components/WaterChart";
import Calender from "../components/Calender";
const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="dashboard_chart">
        <FeatureShowCase
          title={
            <>
              <DETAILE_FEATURES.chart.icon />
              {DETAILE_FEATURES.chart.title}
            </>
          }
          subtitle={DETAILE_FEATURES.chart.subtitle}
          type={DETAILE_FEATURES.chart.type}
          subType={DETAILE_FEATURES.chart.subType}
          child={<WaterChart />}
        />
      </div>

      <div className="dashboard_water_gauge">
        <FeatureShowCase
          title={
            <>
              {" "}
              <DETAILE_FEATURES.water.icon />
              {DETAILE_FEATURES.water.title}
            </>
          }
          subtitle={DETAILE_FEATURES.water.subtitle}
          type={DETAILE_FEATURES.water.type}
          subType={DETAILE_FEATURES.water.subType}
          child={<Calender />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
