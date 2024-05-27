import { useContext } from "react";
import styled from "styled-components";
import { FamilyContext } from "../../context/FamilyContext";

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
function MonthRecords() {
  const datas = useContext(FamilyContext);

  return (
    <>
      {MONTHS.map((month) => (
        <DateButton
          key={month}
          onClick={() => datas.handleChangeDate(month)}
          selected={datas.selectedMonth === month}
        >
          <FontSpan>{month}월</FontSpan>
        </DateButton>
      ))}
    </>
  );
}

export default MonthRecords;
