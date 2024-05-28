export const Warning_OPEN = "popup/Warning/open";
export const Warning_CLOSE = "popup/Warning/close";
const initialState = {
  isVisible: false,
  message: "",
};
function popupReducer(prevState = initialState, action) {
  switch (action.type) {
    case Warning_OPEN:
      return {
        ...prevState,
        isVisible: action.payload.isVisible,
        message: action.payload.message,
      };
    case Warning_CLOSE:
      return {
        ...prevState,
        isVisible: false,
        message: "",
      };
    default:
      return prevState;
  }
}
export default popupReducer;
