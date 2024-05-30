import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ModalProvider } from "../contexts/modal.context";
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
function Layout() {
  return (
    <ModalProvider>
      <GlobalStyle />
      <Container>
        <Outlet />
      </Container>
    </ModalProvider>
  );
}
export default Layout;
