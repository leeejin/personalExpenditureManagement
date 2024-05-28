import { useContext } from "react";
import styled from "styled-components";
import { FamilyContext } from "../../context/FamilyContext";
const GraphItem = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const GraphBack = styled.div`
  background-color: var(--lightgrey-color);
  border-radius: 10px;
  height: 50px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
const GraphFront = styled.div`
  background-color: var(${(props) => props.color});
  width: ${(props) => props.width}%;
  height: 100%;
  transition: width 0.2s ease-in-out 0s;
  &:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:nth-last-child(1) {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const Font = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;
const GraphColor = styled.div`
  width: 20px;
  height: 15px;
  background-color: var(${(props) => props.color});
`;
const colors = [
  "--blue-color",
  "--green-color",
  "--red-color",
  "--yellow-color",
  "--etc-color",
];

const summarizeExpenses = (expenses) => {
  const summary = {};

  for (const expense of expenses) {
    const { item, amount } = expense;

    if (summary[item]) summary[item] += amount;
    else summary[item] = amount;
  }

  return Object.entries(summary).map(([item, amount]) => ({
    [item]: amount,
  }));
};
function GraphRecords() {
  const { filteredDatas, selectedMonth } = useContext(FamilyContext);

  const categoryDatas = summarizeExpenses(filteredDatas).sort((a, b) => {
    return Object.values(b) - Object.values(a);
  });
  let arr = [];
  for (let i = 0; i < categoryDatas.length; i++) {
    if (i < 4) {
      arr.push(categoryDatas[i]);
    } else {
      if (!arr.some((item) => item.hasOwnProperty("기타"))) {
        arr.push({ 기타: [] });
      }
      arr
        .find((item) => item.hasOwnProperty("기타"))
        .기타.push(categoryDatas[i]);
    }
  }
  const handleTotalCost = () => {
    const costArr = filteredDatas.map((data) => data.amount);
    return costArr.reduce((prev, cur) => (prev += cur), 0);
  };

  const handleAmountCalculate = (data, i) => {
    let total = 0;
    if (i < 4) return Object.values(data);
    else {
      const etcData = Object.values(data)[0];
      for (let item of etcData) {
        total += Object.values(item)[0];
      }
      return total;
    }
  };
  return (
    <>
      <Font>
        {selectedMonth}월 총 지출 : {handleTotalCost().toLocaleString()} 원
      </Font>
      <GraphBack>
        {arr.map((data, i) => (
          <GraphFront
            key={i}
            color={colors[i]}
            width={(
              (handleAmountCalculate(data, i) / handleTotalCost()) *
              100
            ).toFixed(2)}
          />
        ))}
      </GraphBack>

      <GraphItem>
        {arr.length
          ? arr.map((data, i) => (
              <GraphItem key={i}>
                <GraphColor color={colors[i]} />
                {Object.keys(data)}:{" "}
                {handleAmountCalculate(data, i).toLocaleString()}원 (
                {(
                  (handleAmountCalculate(data, i) / handleTotalCost()) *
                  100
                ).toFixed(2)}
                %)
              </GraphItem>
            ))
          : null}
      </GraphItem>
    </>
  );
}
export default GraphRecords;
