import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  DELETE_RECORD,
  MODIFY_RECORD,
} from "../../redux/reducers/auth.reducer";
const Button = styled.button`
  background-color: ${(props) => props.color};
  color: var(--white-color);
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
`;
const Section = styled.div`
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
  text-align: left;
`;

function DetailRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, recordId } = location.state;
  const filteredData = data.filter((data) => data.id === recordId)[0];
  const date = useRef("");
  const item = useRef("");
  const amount = useRef(0);
  const description = useRef("");
  /** 수정함수 */
  const handleModify = () => {
    //수정할 데이터
    const formData = {
      date: date.current.value,
      item: item.current.value,
      amount: parseInt(amount.current.value),
      description: description.current.value,
    };
    dispatch({ type: MODIFY_RECORD, payload: { recordId, formData } });
    alert("수정완료되었습니다");
    navigate("/");
  };
  /** 삭제함수 */
  const handleDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      dispatch({ type: DELETE_RECORD, payload: recordId });
      alert("삭제완료되었습니다");
      navigate("/");
    }
  };
  /** 뒤로가기함수 */
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Section>
      <Container direction="column">
        <Container direction="column">
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            ref={date}
            placeholder="YYYY-MM-DD"
            defaultValue={filteredData.date}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            ref={item}
            placeholder="지출 항목"
            defaultValue={filteredData.item}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            ref={amount}
            placeholder="지출 금액"
            defaultValue={filteredData.amount}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            ref={description}
            placeholder="지출 내용"
            defaultValue={filteredData.description}
          />
        </Container>
        <Container direction="row">
          <Button
            color={"var(--blue-color)"}
            hovercolor={"var(--darkblue-color)"}
            onClick={handleModify}
          >
            수정
          </Button>
          <Button
            color={" var(--red-color)"}
            hovercolor={"var(--darkred-color)"}
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            color={"var(--grey-color)"}
            hovercolor={"var(--darkgrey-color)"}
            onClick={handleBack}
          >
            뒤로가기
          </Button>
        </Container>
      </Container>
    </Section>
  );
}

export default DetailRecord;
