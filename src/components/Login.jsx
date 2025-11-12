import { useContext } from "react";
import "./Login.css";
import Button from "./Button";
import { AuthContext, AuthDisPathContext } from "../App";
const Login = () => {
  const isLogin = useContext(AuthContext);
  const { onClickLogin } = useContext(AuthDisPathContext);

  return (
    <div className="Login">
      {isLogin ? (
        <div className="login_container">
          <p className="login_user_name">OOO님 안녕하세요!</p>
          <Button
            onClick={() => onClickLogin()}
            type={"login"}
            text={"로그아웃"}
          />
        </div>
      ) : (
        <div className="logout_container">
          <Button type={"create_account"} text={"가입하기"} />
          |
          <Button
            onClick={() => onClickLogin()}
            type={"logout"}
            text={"로그인"}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
