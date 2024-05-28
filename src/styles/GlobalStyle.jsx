import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
  background-color: var(--background-color);
  overflow: ${({ isModalOpen }) => (isModalOpen ? "hidden" : "auto")};
}
div {
  box-sizing: border-box;
}
input {
  padding: 10px;
  border: 1px solid var(--lightgrey-color);
  border-radius: 5px;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  min-width: 75px;
  &:hover {
    cursor: pointer;
    transition: all 0.5s;
  }
}

`;
export default GlobalStyle;
