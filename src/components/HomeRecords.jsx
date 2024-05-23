import { useEffect, useState } from "react";
import styled from "styled-components";
import AddRecord from "./AddRecord";
import FooterRecords from "./FooterRecords";
import GraphRecords from "./GraphRecords";
const Section = styled.section`
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
`;
const FontSpan = styled.span`
  font-size: 18px;
  font-family: Pretendard, serif;
  font-weight: 600;
`;
const DateButton = styled.button`
  width: 104px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${({ selected }) =>
    selected ? "var(--background-color)" : "var(--lightwhite-color)"};
  color: ${({ selected }) => (selected ? "var(--white-color)" : "inherit")};
  &:hover {
    background-color: var(--background-color);
    color: var(--white-color);
  }
`;

const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
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
    <>
      <Section>
        <AddRecord handleExpendDatas={handleExpendDatas} />
      </Section>

      <Section>
        {MONTHS.map((month) => (
          <DateButton
            key={month}
            onClick={() => handleChangeDate(month)}
            selected={selectedMonth === month}
          >
            <FontSpan>{month}월</FontSpan>
          </DateButton>
        ))}
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
