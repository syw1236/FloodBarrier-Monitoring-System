import "./Button.css";
import { useNavigate } from "react-router-dom";
const Button = ({ type, text, onClick, to, isActive, disabled = false }) => {
  const nav = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(text, e);
    if (to) nav(to);
  };

  return (
    <div className="Button">
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`Button Button_${type} ${isActive ? "active" : ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
