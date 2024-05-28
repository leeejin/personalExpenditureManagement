import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isVisible: false,
  message: "",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    popupOpen: (state, action) => {
      state.isVisible = action.payload.isVisible;
      state.message = action.payload.message;
    },
    popupClose: (state) => {
      state.isVisible = false;
      state.message = "";
    },
  },
});
export const { popupOpen, popupClose } = popupSlice.actions;

export default popupSlice.reducer;
