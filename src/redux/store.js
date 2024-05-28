import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import modalReducer from "./reducers/modal.reducer";
import popupReducer from "./reducers/popup.reducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    modal: modalReducer,
  },
});

export default store;
