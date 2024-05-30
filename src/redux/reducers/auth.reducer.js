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
      const addedData = [...state.filteredDatas, action.payload];
      updatedLocalStorage(addedData);
      state.selectedMonth = action.payload.date.slice(5, 7);
      state.filteredDatas = addedData;
    },
    modifyAuth: (state, action) => {
      const modifiedData = [...state.filteredDatas].map(
        (data) => {
          if (data.id === action.payload.recordId)
            return { ...data, ...action.payload.formData };
          return data;
        },
        [...state.filteredDatas]
      );
      updatedLocalStorage(modifiedData);
      state.filteredDatas = modifiedData;
    },
    deleteAuth: (state, action) => {
      const eliminatedData = [...state.filteredDatas].filter(
        (data) => data.id !== action.payload
      );
      updatedLocalStorage(eliminatedData);
      state.filteredDatas = eliminatedData;
    },
  },
});
export const { changeAuth, addAuth, modifyAuth, deleteAuth } =
  authSlice.actions;
export default authSlice.reducer;
