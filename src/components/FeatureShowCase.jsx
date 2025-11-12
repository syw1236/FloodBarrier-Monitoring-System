import "./FeatureShowCase.css";
const FeatureShowCase = ({ title, subtitle, type, subType, child }) => {
  return (
    <div className="FeatureShowCase">
      <div className={`feature_wrapper_${type}`}>
        <div className={`feature_explain`}>
          <h2 className={`title ${type}_${subType}`}>{title}</h2>
          <h4 className="subtitle">{subtitle}</h4>
        </div>
        <div className={`feature_content ${subType}`}>{child}</div>
      </div>
    </div>
  );
};

export default FeatureShowCase;
