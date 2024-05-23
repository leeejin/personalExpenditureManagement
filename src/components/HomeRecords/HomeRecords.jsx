import { useEffect, useState } from "react";
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
  const [expendedDatas, setExpendedDatas] = useState([]);
  const filteredDatas = expendedDatas.filter(
    (data) => data.date.slice(5, 7) == selectedMonth
  );
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setExpendedDatas(data);
  }, []);

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
    <FamilyContext.Provider value={{ filteredDatas, selectedMonth }}>
      <Section>
        <AddRecord handleExpendDatas={handleExpendDatas} />
      </Section>

      <Section>
        <MonthRecord handleChangeDate={handleChangeDate} />
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
