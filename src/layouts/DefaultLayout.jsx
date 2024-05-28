import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/color.css";

const Container = styled.div`
  max-width: 965px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
function DefaultLayout() {
  const warning = useSelector((state) => state.popup);
  return (
    <>
      <GlobalStyle />
      {warning.isVisible && <Alert />}
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
export default DefaultLayout;
