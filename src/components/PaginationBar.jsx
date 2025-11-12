import "./PaginationBar.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Button from "./Button";
import { useContext } from "react";
import { DatesContext, DatesDispatchContext } from "./Calender";

const PaginationBar = () => {
  const { date, dates } = useContext(DatesContext);
  const { onUpdateOffSet, onUpdateDate } = useContext(DatesDispatchContext);

  const onClickButton = (item) => {
    onUpdateDate({
      year: item.getFullYear(),
      month: item.getMonth() + 1,
      day: item.getDate(),
    });
  };

  return (
    <div className="Pagination">
      <button
        onClick={() => onUpdateOffSet(-1)}
        className="pagination_button_pre"
      >
        <GoArrowLeft /> Previous
      </button>
      <div className="pagination_date">
        {dates.map((item, id) => (
          <Button
            key={id}
            onClick={() => onClickButton(item)}
            type={"pagination"}
            text={item.getDate()}
            isActive={
              item.getFullYear() === date.year &&
              item.getMonth() + 1 === date.month &&
              item.getDate() === date.day
            }
          />
        ))}
      </div>
      <button
        onClick={() => onUpdateOffSet(1)}
        className="pagination_button_next"
      >
        <GoArrowRight />
        Next
      </button>
    </div>
  );
};
export default PaginationBar;
