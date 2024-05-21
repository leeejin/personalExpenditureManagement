import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Button = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: var(--white-color);
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
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

function DetailRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const recordId = location.state;
  console.log(data[recordId]);
  /** 수정함수 */
  const handleModify = () => {};
  /** 삭제함수 */
  const handleDelete = () => {};
  /** 뒤로가기함수 */
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Section>
      <Container direction="column">
        <Container direction="column">
          <label htmlFor="date">날짜</label>
          <input type="text" id="date" placeholder="YYYY-MM-DD" />
        </Container>
        <Container direction="column">
          <label htmlFor="category">항목</label>
          <input type="text" id="category" placeholder="지출 항목" />
        </Container>
        <Container direction="column">
          <label htmlFor="cost">금액</label>
          <input type="number" id="cost" placeholder="지출 금액" />
        </Container>
        <Container direction="column">
          <label htmlFor="content">내용</label>
          <input type="text" id="content" placeholder="지출 내용" />
        </Container>
        <Container direction="row">
          <Button
            backgroundColor={"var(--blue-color)"}
            hoverBackgroundColor={"var(--darkblue-color)"}
            onClick={handleModify}
          >
            수정
          </Button>
          <Button
            backgroundColor={" var(--red-color)"}
            hoverBackgroundColor={"var(--darkred-color)"}
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            backgroundColor={"var(--grey-color)"}
            hoverBackgroundColor={"var(--darkgrey-color)"}
            onClick={handleBack}
          >
            뒤로가기
          </Button>
        </Container>
      </Container>
    </Section>
  );
}

export default DetailRecords;
