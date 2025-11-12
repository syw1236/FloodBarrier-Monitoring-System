import "./RequireLogin.css";
import Button from "../components/Button";
import { PiHandPalmDuotone } from "react-icons/pi";
const RequireLogin = () => {
  return (
    <div className="RequireLogin">
      <div className="login_dialog">
        <p className="stop">잠깐! {<PiHandPalmDuotone />}</p>
        <p className="login_warning">로그인 후 이용 가능합니다.</p>
        <p className="login_description">
          시스템의 안전한 이용을 위해 계정 인증이 필요합니다. <br />
          로그인 후 대시보드 및 제어 기능을 이용할 수 있습니다.
        </p>

        <div className="login_button">
          <Button type={"go_login"} text={"로그인하러 가기"} />
        </div>
      </div>
    </div>
  );
};

export default RequireLogin;
