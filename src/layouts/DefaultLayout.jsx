import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { FamilyContext, PopupContext } from "../context/FamilyContext";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/color.css";

const Container = styled.div`
  max-width: 965px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
function DefaultLayout() {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [expendedDatas, setExpendedDatas] = useState([]);
  const filteredDatas = expendedDatas.filter(
    (data) => data.date.slice(5, 7) == selectedMonth
  );
  const [warning, setWarning] = useState({ isVisible: false, message: "" });

  const [modal, setModal] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setExpendedDatas(data);
  }, []);

  const handleChangeDate = useCallback(
    (month) => {
      setSelectedMonth(month);
    },
    [selectedMonth]
  );
  const handleExpendDatas = (formData) => {
    setExpendedDatas((prev) => [...prev, formData]);
    setSelectedMonth(`${formData.date.slice(5, 7)}`);
    const newData = [...expendedDatas, formData];
    localStorage.setItem("data", JSON.stringify(newData));
  };
  const handleModal = useCallback(
    (type) => {
      setModal((prev) => ({
        ...prev,
        isVisible: true,
        message: type,
      }));
    },
    [modal.message]
  );
  return (
    <PopupContext.Provider
      value={{ warning, modal, setModal, handleModal, setWarning }}
    >
      <FamilyContext.Provider
        value={{
          setExpendedDatas,
          filteredDatas,
          selectedMonth,
          handleExpendDatas,
          handleChangeDate,
          expendedDatas,
        }}
      >
        {warning.isVisible && <Alert />}
        <GlobalStyle />
        <Container>
          <Outlet />
        </Container>
      </FamilyContext.Provider>
    </PopupContext.Provider>
  );
}
export default DefaultLayout;
