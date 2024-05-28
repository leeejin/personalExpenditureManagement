import { createSlice } from "@reduxjs/toolkit";

const expendedDatas = JSON.parse(localStorage.getItem("data")) || [];
const initialState = {
  selectedMonth: "01",
  filteredDatas: expendedDatas,
};

const updatedLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    addAuth: (state, action) => {
      const add = [...state.filteredDatas, action.payload];
      updatedLocalStorage(add);
      state.selectedMonth = action.payload.date.slice(5, 7);
      state.filteredDatas = add;
    },
    modifyAuth: (state, action) => {
      const modify = [...state.filteredDatas].map(
        (data) => {
          if (data.id === action.payload.recordId)
            return { ...data, ...action.payload.formData };
          return data;
        },
        [...state.filteredDatas]
      );
      updatedLocalStorage(modify);
      state.filteredDatas = modify;
    },
    deleteAuth: (state, action) => {
      const elimination = [...state.filteredDatas].filter(
        (data) => data.id != action.payload
      );
      updatedLocalStorage(elimination);
      state.filteredDatas = elimination;
    },
  },
});
// function authReducer(prevState = initialState, action) {
//   const add = [...prevState.filteredDatas, action.payload];

//   const elimination = [...prevState.filteredDatas].filter(
//     (data) => data.id != action.payload
//   );
//   switch (action.type) {
//     case CHANGE_MONTH:
//       return {
//         ...prevState,
//         selectedMonth: action.payload,
//       };
//     case ADD_RECORD:
//       updatedLocalStorage(add);
//       return {
//         ...prevState,
//         selectedMonth: action.payload.date.slice(5, 7),
//         filteredDatas: add,
//       };
//     case MODIFY_RECORD:
//       updatedLocalStorage(
//         [...prevState.filteredDatas].map(
//           (data) => {
//             if (data.id === action.payload.recordId)
//               return { ...data, ...action.payload.formData };
//             return data;
//           },
//           [...prevState.filteredDatas]
//         )
//       );
//       return {
//         ...prevState,
//         filteredDatas: [...prevState.filteredDatas].map(
//           (data) => {
//             if (data.id === action.payload.recordId)
//               return { ...data, ...action.payload.formData };
//             return data;
//           },
//           [...prevState.filteredDatas]
//         ),
//       };
//     case DELETE_RECORD:
//       updatedLocalStorage(elimination);

//       return {
//         ...prevState,
//         filteredDatas: elimination,
//       };
//     default:
//       return prevState;
//   }
// }
export const { changeAuth, addAuth, modifyAuth, deleteAuth } =
  authSlice.actions;
export default authSlice.reducer;
