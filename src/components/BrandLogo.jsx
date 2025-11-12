import "./BrandLogo.css";
import logo from "/logo.png";

const BrandLogo = () => {
  return (
    <div className="BrandLogo">
      <img src={logo} />
      <p className="name">물막이판 관리 센터</p>
    </div>
  );
};

export default BrandLogo;
