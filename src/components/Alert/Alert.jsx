import styled from "styled-components";
import warningIcon from "../../styles/images/warning-icon.png";

const AlertWrap = styled.div`
  position: fixed;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  background-color: var(--white-color);
  box-shadow: 3px 3px 3px var(--grey-color);
  z-index: 15;
  top: 50%; // 중앙 고정
  left: 50%; // 중앙 고정
  transform: translate(-50%, -50%); // 중앙 정렬
  margin: auto;
  animation: alertAnimation 1.5s forwards;
  @keyframes alertAnimation {
    0% {
      top: -120px;
    }
    50% {
      top: 100px; // 중앙 고정
    }
    100% {
      top: -120px;
    }
  }
`;
const Img = styled.img`
  width: 25px;
  margin: 0 auto;
`;
/** 알림창 */
const Alert = ({ message }) => {
  return (
    <AlertWrap>
      <Img src={warningIcon} />
      <h3>{message}</h3>
    </AlertWrap>
  );
};

export default Alert;
