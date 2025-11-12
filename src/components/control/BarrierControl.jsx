import "./BarrierControl.css";
import Button from "../Button";
import { useContext } from "react";
import { AutoContext, AutoDispatchContext } from "../../pages/Control";
import { OpenDispatchContext } from "../../pages/Control";
import { ControlTimeDispatchContext } from "../../pages/Control";

const BarrierControl = () => {
  const isAutomaticControl = useContext(AutoContext);
  const { setIsOpen } = useContext(OpenDispatchContext);
  const { setIsAutomaticControl } = useContext(AutoDispatchContext);
  const { setLastControlTime } = useContext(ControlTimeDispatchContext);

  const onClickAutoButton = () => {
    if (
      window.confirm(
        `${
          isAutomaticControl
            ? "현재 자동제어가 켜져있습니다. 정말 자동제어를 끄시겠습니까?"
            : "현재 자동제어가 꺼져있습니다. 정말 자동제어를 키시겠습니까?"
        }`
      )
    ) {
      setIsAutomaticControl(!isAutomaticControl);
      setLastControlTime(new Date());
    }
  };

  return (
    <div className="BarrierControl">
      <div className="threeD_controller">
        <div className="controller_onoff">
          <Button
            disabled={isAutomaticControl}
            onClick={() => {
              setIsOpen(true);
            }}
            text={"열기"}
            type={"threeD_controller_open"}
          />
          <Button
            disabled={isAutomaticControl}
            onClick={() => setIsOpen(false)}
            text={"닫기"}
            type={"threeD_controller_close"}
          />
        </div>
        <Button
          onClick={onClickAutoButton}
          text={"자동제어 on/off"}
          type={`threeD_controller_auto_${isAutomaticControl}`}
        />
      </div>
    </div>
  );
};

export default BarrierControl;
