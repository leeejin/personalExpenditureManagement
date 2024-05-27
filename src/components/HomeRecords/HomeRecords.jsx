import { useState } from "react";
import styled from "styled-components";
import { FamilyContext } from "../../context/FamilyContext";
import AddRecord from "../AddRecord/AddRecord";
import FooterRecords from "../FooterRecords/FooterRecords";
import GraphRecords from "../GraphRecords/GraphRecords";
import MonthRecord from "../MonthRecord";
const Section = styled.section`
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
`;

function HomeRecords() {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [expendedDatas, setExpendedDatas] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const filteredDatas = expendedDatas.filter(
    (data) => data.date.slice(5, 7) == selectedMonth
  );

  const handleChangeDate = (month) => {
    setSelectedMonth(month);
  };
  const handleExpendDatas = (formData) => {
    setExpendedDatas((prev) => [...prev, formData]);
    setSelectedMonth(`${formData.date.slice(5, 7)}`);
    const newData = [...expendedDatas, formData];
    localStorage.setItem("data", JSON.stringify(newData));
  };
  return (
    <FamilyContext.Provider
      value={{
        filteredDatas,
        selectedMonth,
        handleExpendDatas,
        handleChangeDate,
      }}
    >
      <Section>
        <AddRecord />
      </Section>

      <Section>
        <MonthRecord />
      </Section>

      <Section>
        <GraphRecords />
      </Section>

      <Section>
        <FooterRecords />
      </Section>
    </FamilyContext.Provider>
  );
}

export default HomeRecords;
