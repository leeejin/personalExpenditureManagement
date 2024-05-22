import styled from "styled-components";
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
function Home({ children }) {
  return (
    <>
      <GlobalStyle />
      <Container>{children}</Container>;
    </>
  );
}
export default Home;
