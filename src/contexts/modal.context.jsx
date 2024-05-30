import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
import GlobalStyle from "../styles/GlobalStyle";
import { useRecord } from "./data.context";
const initialState = {
  modalOpen: () => {},
  modalClose: () => {},
  modalConfirm: () => {},
};
export const ModalContext = createContext(initialState); //모달,팝업창 관리

export const useModal = () => useContext(ModalContext);
const DEL_MESSAGE = "삭제하시겠습니까 ?";
const MODI_MESSAGE = "수정하시겠습니까 ?";

export function ModalProvider({ children }) {
  const [modalOptions, setModalOptions] = useState(null);
  const [havingData, setHavingData] = useState({});
  const record = useRecord();
  const value = {
    modalOpen: (options) => {
      setModalOptions(options);
      setHavingData(options.formData);
    },
    modalClose: () => {
      setModalOptions(null);
    },
    modalConfirm: (options) => {
      if (options.message == MODI_MESSAGE)
        record.modifyRecord(havingData.id, havingData);
      else if (options.message == DEL_MESSAGE)
        record.deleteRecord(havingData.id);
      setModalOptions(null);
    },
  };
  return (
    <ModalContext.Provider value={value}>
      <GlobalStyle isModalOpen={modalOptions} />
      {modalOptions && <Modal message={modalOptions.message} />}
      {children}
    </ModalContext.Provider>
  );
}
