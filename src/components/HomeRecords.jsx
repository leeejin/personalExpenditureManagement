import { useEffect, useState } from "react";
import styled from "styled-components";
import AddRecord from "./AddRecord";
import FooterRecords from "./FooterRecords";
import GraphRecords from "./GraphRecords";
import MonthRecords from "./MonthRecords";
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
    (data) => data.date.slice(5, 7) === selectedMonth
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
    <>
      <Section>
        <AddRecord handleExpendDatas={handleExpendDatas} />
      </Section>

      <Section>
        <MonthRecords
          selectedMonth={selectedMonth}
          handleChangeDate={handleChangeDate}
        />
      </Section>
      <Section>
        <GraphRecords
          selectedMonth={selectedMonth}
          expendedDatas={filteredDatas}
        />
      </Section>
      <Section>
        <FooterRecords expendedDatas={filteredDatas} />
      </Section>
    </>
  );
}

export default HomeRecords;
