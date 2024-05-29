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
        (data) => data.id !== action.payload
      );
      updatedLocalStorage(elimination);
      state.filteredDatas = elimination;
    },
  },
});
export const { changeAuth, addAuth, modifyAuth, deleteAuth } =
  authSlice.actions;
export default authSlice.reducer;
