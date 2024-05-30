import styled from "styled-components";
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
  const summary = expenses.reduce((acc, { item, amount }) => {
    acc[item] = (acc[item] || 0) + amount;
    return acc;
  }, {});

  const sortedSummary = Object.entries(summary)
    .map(([item, amount]) => ({ [item]: amount }))
    .sort((a, b) => {
      return Object.values(b) - Object.values(a);
    });

  const topItems = sortedSummary.slice(0, 4);
  const remainingItems = sortedSummary.slice(4).reduce(
    (acc, item) => {
      acc.기타.push(item);
      return acc;
    },
    { 기타: [] }
  );

  return sortedSummary.length > 4
    ? [...topItems, remainingItems]
    : sortedSummary;
};
function GraphRecords({ selectedMonth, expendedDatas }) {
  const arr = summarizeExpenses(expendedDatas);
  const handleTotalCost = () => {
    const costArr = expendedDatas.map((data) => data.amount);
    return costArr.reduce((prev, cur) => (prev += cur), 0);
  };

  const handleAmountCalculate = (data, i) => {
    return i < 4
      ? Object.values(data)
      : Object.values(data)[0].reduce(
          (total, item) => total + Object.values(item)[0],
          0
        );
  };
  return (
    <>
      <Font>
        {parseInt(selectedMonth)}월 총 지출 :{" "}
        {handleTotalCost().toLocaleString()} 원
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
