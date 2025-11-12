import "./Home.css";
import mainImage from "../assets/main_image.png";
import FeatureCard from "../components/FeatureCard";
import FeatureShowCase from "../components/FeatureShowCase";
import { MAIN_MESSAGE, FEATURE } from "../utils/constants";

const Home = () => {
  return (
    <div className="Home">
      <div className="main_wrapper">
        <div className="image_container">
          <img src={mainImage} />
        </div>

        <div className="explain_container">
          <div className="explain_title">
            <h3>
              <MAIN_MESSAGE.icon />
              {MAIN_MESSAGE.title}
            </h3>
            <p className="explain_subtitle">{MAIN_MESSAGE.subtitle}</p>
          </div>

          <div className="explain_function">
            {FEATURE.map((item, idx) => {
              return (
                <FeatureCard
                  key={idx}
                  title={
                    <>
                      <item.icon />
                      {item.title}
                    </>
                  }
                  subtitle={item.subtitle}
                  svg={item.svg}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="Feature_container">
        {FEATURE.map((item, idx) => (
          <FeatureShowCase
            key={idx}
            title={
              <>
                <item.icon />
                {item.title}
              </>
            }
            subtitle={item.explain}
            type={item.type}
            subType={item.subType}
            child={
              <>
                {item.image.map((i) => (
                  <img src={i} />
                ))}
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
