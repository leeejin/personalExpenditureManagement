import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const initialState = {
  popupOpen: () => {},
  popupClose: () => {},
};
export const PopupContext = createContext(initialState); //모달,팝업창 관리

export const useWarning = () => useContext(PopupContext);

export function PopupProvider({ children }) {
  const [warningOptions, setWarningOptions] = useState(null);
  const value = {
    popupOpen: (options) => {
      setWarningOptions(options);
    },
    popupClose: () => {
      setWarningOptions(null);
    },
  };
  return (
    <PopupContext.Provider value={value}>
      {warningOptions && <Alert message={warningOptions.message} />}
      {children}
    </PopupContext.Provider>
  );
}
