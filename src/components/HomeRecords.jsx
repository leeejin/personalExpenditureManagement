import { useEffect, useState } from "react";
import styled from "styled-components";
import AddRecords from "./AddRecord";
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
const months = [
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
  const [expenditureData, setExpenditureData] = useState([]);
  const filteredData = expenditureData.filter(
    (data) => data.date.slice(5, 7) == selectedMonth
  );
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setExpenditureData(data);
  }, []);

  const handleChangeDate = (month) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <Section>
        <AddRecords
          setExpenditureData={setExpenditureData}
          expenditureData={expenditureData}
        />
      </Section>

      <Section>
        {months.map((month) => (
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
          filteredData={filteredData}
        />
      </Section>
      <Section>
        <FooterRecords filteredData={filteredData} />
      </Section>
    </>
  );
}

export default HomeRecords;
