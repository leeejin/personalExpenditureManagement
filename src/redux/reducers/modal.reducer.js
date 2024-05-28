export const Modal_OPEN = "popup/Modal/open";
export const Modal_CLOSE = "popup/Modal/close";
const initialState = {
  isVisible: false,
  message: "",
};
function modalReducer(prevState = initialState, action) {
  switch (action.type) {
    case Modal_OPEN:
      return {
        ...prevState,
        isVisible: action.payload.isVisible,
        message: action.payload.message,
      };
    case Modal_CLOSE:
      return {
        ...prevState,
        isVisible: false,
        message: "",
      };
    default:
      return prevState;
  }
}
export default modalReducer;
