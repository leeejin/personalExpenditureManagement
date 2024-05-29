import { useCallback, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FamilyContext, PopupContext } from "../../context/FamilyContext";
import GlobalStyle from "../../styles/GlobalStyle";
import { isDateValid } from "../../util/date";
import Modal from "../Modal";
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

const DEL_MESSAGE = "삭제하시겠습니까 ?";
const MODI_MESSAGE = "수정하시겠습니까 ?";

function DetailRecords() {
  const { expendedDatas, setExpendedDatas } = useContext(FamilyContext);
  const { setWarning, modal, setModal, handleModal } = useContext(PopupContext);
  const navigate = useNavigate();
  const params = useParams();
  const data = expendedDatas.filter((data) => data.id == params.recordsId)[0];
  const date = useRef("");
  const item = useRef("");
  const amount = useRef(0);
  const description = useRef("");

  /** 수정함수 */
  const handleModify = () => {
    //수정할 데이터
    const formData = {
      date: date.current.value.trim(),
      item: item.current.value.trim(),
      amount:
        parseInt(amount.current.value.trim()) ||
        (!amount.current.value.trim() && 0),
      description: description.current.value.trim(),
    };

    const error = {
      date: !isDateValid(formData.date),
      item: !formData.item.trim(),
      amount: formData.amount <= 0,
      description: !formData.description.trim(),
    };
    let message = "";
    if (error.date || error.item || error.amount || error.description) {
      if (error.date) message = "날짜형식이 잘못되었습니다";
      else if (error.item) message = "항목을 입력해주세요";
      else if (error.amount) message = "금액은 양수로 입력해주세요";
      else if (error.description) message = "내용을 입력해주세요";

      setWarning((prev) => ({
        ...prev,
        isVisible: true,
        message,
      }));
      setTimeout(
        () =>
          setWarning((prev) => ({
            ...prev,
            isVisible: false,
            message: "",
          })),
        1500
      );
      return;
    }
    const modifiedData = expendedDatas.map((data) => {
      if (data.id === params.recordsId) return { ...data, ...formData };
      return data;
    }, expendedDatas);
    setExpendedDatas(modifiedData);
    localStorage.setItem("data", JSON.stringify(modifiedData));
    navigate("/");
  };
  /** 삭제함수 */
  const handleDelete = () => {
    const deleteData = expendedDatas.filter(
      (data) => data.id !== params.recordsId
    );
    setExpendedDatas(deleteData);
    localStorage.setItem("data", JSON.stringify(deleteData));
    navigate("/");
  };
  /** 뒤로가기함수 */
  const handleBack = useCallback(() => {
    navigate(-1);
  }, []);

  const handleConfirm = () => {
    if (modal.message == MODI_MESSAGE) {
      handleModify();
    } else if (modal.message == DEL_MESSAGE) {
      handleDelete();
    }
    setModal((prev) => ({
      ...prev,
      isVisible: false,
      message: "",
    }));
  };

  return (
    <Section>
      <GlobalStyle isModalOpen={modal.isVisible} />
      {modal.isVisible && <Modal handleConfirm={handleConfirm} />}

      <Container direction="column">
        <Container direction="column">
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            ref={date}
            placeholder="YYYY-MM-DD"
            defaultValue={data.date}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            ref={item}
            placeholder="지출 항목"
            defaultValue={data.item}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            ref={amount}
            placeholder="지출 금액"
            defaultValue={data.amount}
          />
        </Container>
        <Container direction="column">
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            ref={description}
            placeholder="지출 내용"
            defaultValue={data.description}
          />
        </Container>
        <Container direction="row">
          <Button
            color="var(--blue-color)"
            hovercolor="var(--darkblue-color)"
            onClick={() => handleModal(MODI_MESSAGE)}
          >
            수정
          </Button>
          <Button
            color=" var(--red-color)"
            hovercolor="var(--darkred-color)"
            onClick={() => handleModal(DEL_MESSAGE)}
          >
            삭제
          </Button>
          <Button
            color="var(--grey-color)"
            hovercolor="var(--darkgrey-color)"
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
