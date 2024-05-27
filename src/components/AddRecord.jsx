import React, { useRef, useState } from "react";
import styled from "styled-components";
import Alert from "./Alert";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }
`;
const Button = styled.button`
  background-color: var(--blue-color);
  color: var(--white-color);
  &:hover {
    background-color: var(--darkblue-color);
  }
`;

function AddRecord({ handleExpendDatas }) {
  const [alerts, setAlerts] = useState({ isVisible: false, message: "" });

  const date = useRef("");
  const item = useRef("");
  const amount = useRef(0);
  const description = useRef("");

  const handleSubmit = () => {
    const formData = {
      id: crypto.randomUUID(),
      date: date.current.value,
      item: item.current.value,
      amount: parseInt(amount.current.value),
      description: description.current.value,
    };
    const error = {
      date: !`${formData.date.slice(0, 4)}-${formData.date.slice(
        5,
        7
      )}-${formData.date.slice(8)}`,
      item: !formData.item.length,
      amount: formData.amount <= 0,
      description: !formData.description.length,
    };
    if (error.date || error.item || error.amount || error.description) {
      if (error.date) {
        setAlerts((prev) => ({
          ...prev,
          isVisible: true,
          message: "날짜형식이 잘못되었습니다",
        }));
      } else if (error.item) {
        setAlerts((prev) => ({
          ...prev,
          isVisible: true,
          message: "항목을 입력해주세요",
        }));
      } else if (error.amount) {
        setAlerts((prev) => ({
          ...prev,
          isVisible: true,
          message: "금액은 양수로 입력해주세요",
        }));
      } else if (error.description) {
        setAlerts((prev) => ({
          ...prev,
          isVisible: true,
          message: "내용을 입력해주세요",
        }));
      }
      setTimeout(
        () =>
          setAlerts((prev) => ({
            ...prev,
            isVisible: false,
            message: "",
          })),
        1500
      );
      return;
    }
    handleExpendDatas(formData);
  };
  return (
    <Container>
      {alerts.isVisible && <Alert message={alerts.message} />}
      <div>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          ref={date}
          placeholder="YYYY-MM-DD"
          defaultValue="2024-01-01"
          required
        />
      </div>
      <div>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          ref={item}
          placeholder="지출 항목"
          required
        />
      </div>
      <div>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          ref={amount}
          placeholder="지출 금액"
          required
        />
      </div>
      <div>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          ref={description}
          placeholder="지출 내용"
          required
        />
      </div>
      <div>
        <Button onClick={handleSubmit}>저장</Button>
      </div>
    </Container>
  );
}
export default React.memo(AddRecord);