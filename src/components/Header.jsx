import "./Header.css";
import BrandLogo from "./BrandLogo";
import Navigate from "./Navigate";
import Login from "./Login";
const Header = () => {
  return (
    <div className="Header">
      <div className="logo_wrapper">
        <BrandLogo />
      </div>
      <div className="navigate_wrapper">
        <Navigate />
      </div>
      <div className="login_wrapper">
        <Login />
      </div>
    </div>
  );
};

export default Header;
