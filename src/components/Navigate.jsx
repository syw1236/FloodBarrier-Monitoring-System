import "./Navigate.css";
import { MENU } from "../utils/constants";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Navigate = () => {
  const location = useLocation();

  return (
    <div className="Navigate">
      {MENU.map((item, idx) => (
        <Button
          key={idx}
          type={"menu"}
          text={item.name}
          to={item.to}
          isActive={location.pathname === item.to}
        />
      ))}
    </div>
  );
};

export default Navigate;
