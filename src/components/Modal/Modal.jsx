import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { modalClose } from "../../redux/reducers/modal.reducer";
const BackWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WhiteWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  width: 400px;
  height: 200px;
  background-color: var(--white-color);
  border-radius: 20px;
  border: none;
`;
const Button = styled.button`
  background-color: ${(props) => props.color};
  color: var(--white-color);
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  button {
    width: 50%;
    margin: 10px;
    background-color: ${(props) => props.color};
    color: var(--white-color);
    &:hover {
      background-color: ${(props) => props.hovercolor};
    }
  }
`;
const Message = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin: auto;
`;
function Modal({ handleConfirm }) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return (
    <BackWrap>
      <WhiteWrap>
        <Message>{modal.message}</Message>
        <Footer>
          <Button
            color={"var(--blue-color)"}
            hovercolor={"var(--darkblue-color)"}
            onClick={handleConfirm}
          >
            확인
          </Button>
          <Button
            color={"var(--grey-color)"}
            hovercolor={"var(--darkgrey-color)"}
            onClick={() => dispatch(modalClose())}
          >
            취소
          </Button>
        </Footer>
      </WhiteWrap>
    </BackWrap>
  );
}

export default Modal;
