import "./FeatureCard.css";
const FeatureCard = ({ title, subtitle, svg }) => {
  return (
    <div className="FeatureCard ">
      <p className={`featurecard_title ${svg}`}>{title}</p>
      <p className="featurecard_subtitle">{subtitle}</p>
    </div>
  );
};

export default FeatureCard;
