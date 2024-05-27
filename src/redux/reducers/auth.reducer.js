const expendedDatas = JSON.parse(localStorage.getItem("data")) || [];
const initialState = {
  selectedMonth: "01",
  filteredDatas: expendedDatas,
};
export const CHANGE_MONTH = "ChangeMonth";
export const ADD_RECORD = "addRecord";
export const MODIFY_RECORD = "modifyRecord";
export const DELETE_RECORD = "deleteRecord";

const updatedLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
function authReducer(prevState = initialState, action) {
  switch (action.type) {
    case CHANGE_MONTH:
      return {
        ...prevState,
        selectedMonth: action.payload,
      };
    case ADD_RECORD:
      updatedLocalStorage([...prevState.filteredDatas, action.payload]);
      return {
        ...prevState,
        selectedMonth: action.payload.date.slice(5, 7),
        filteredDatas: [...prevState.filteredDatas, action.payload],
      };
    case MODIFY_RECORD:
      updatedLocalStorage(
        [...prevState.filteredDatas].map(
          (data) => {
            if (data.id === action.payload.recordId)
              return { ...data, ...action.payload.formData };
            return data;
          },
          [...prevState.filteredDatas]
        )
      );
      return {
        ...prevState,
        filteredDatas: [...prevState.filteredDatas].map(
          (data) => {
            if (data.id === action.payload.recordId)
              return { ...data, ...action.payload.formData };
            return data;
          },
          [...prevState.filteredDatas]
        ),
      };
    case DELETE_RECORD:
      updatedLocalStorage(
        [...prevState.filteredDatas].filter((data) => data.id != action.payload)
      );

      return {
        ...prevState,
        filteredDatas: [...prevState.filteredDatas].filter(
          (data) => data.id != action.payload
        ),
      };
    default:
      return prevState;
  }
}

export default authReducer;
