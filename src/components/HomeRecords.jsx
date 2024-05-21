import { useState } from "react";
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
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--background-color)" : "var(--lightwhite-color)"};
  color: ${({ isSelected }) => (isSelected ? "var(--white-color)" : "inherit")};
  &:hover {
    background-color: var(--background-color);
    color: var(--white-color);
  }
`;
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const data = [
  {
    id: 1,
    lists: [
      {
        id: 0,
        date: "2024-01-20",
        category: "식비",
        content: "와장창",
        cost: 100000,
      },
      {
        id: 1,
        date: "2024-01-20",
        category: "식비",
        content: "와장창",
        cost: 70000,
      },
      {
        id: 2,
        date: "2024-01-20",
        category: "식비",
        content: "와장창",
        cost: 70000,
      },
    ],
  },
  {
    id: 2,
    lists: [
      {
        id: 0,
        date: "2024-02-20",
        category: "식비",
        content: "와장창",
        cost: 100000,
      },
      {
        id: 1,
        date: "2024-02-20",
        category: "식비",
        content: "와장창",
        cost: 70000,
      },
    ],
  },
  {
    id: 3,
    lists: [
      {
        id: 0,
        date: "2024-03-20",
        category: "식비",
        content: "와장창",
        cost: 100000,
      },
    ],
  },
  {
    id: 4,
    lists: [],
  },
  {
    id: 5,
    lists: [],
  },
  {
    id: 6,
    lists: [],
  },
  {
    id: 7,
    lists: [],
  },
  {
    id: 8,
    lists: [],
  },
  {
    id: 9,
    lists: [],
  },
  {
    id: 10,
    lists: [],
  },
  {
    id: 11,
    lists: [],
  },
  {
    id: 12,
    lists: [],
  },
];
function HomeRecords() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [expenditureData, setExpenditureData] = useState(data);

  const filteredData = expenditureData.filter(
    (data) => data.id === selectedMonth
  )[0].lists;

  const handleChangeDate = (month) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <Section>
        <AddRecords />
      </Section>

      <Section>
        {months.map((month) => (
          <DateButton
            key={month}
            onClick={() => handleChangeDate(month)}
            isSelected={selectedMonth === month}
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
