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
function GraphRecords({ selectedMonth, filteredData }) {
  const sortedFilteredData = filteredData.sort((a, b) => b.cost - a.cost);
  const categoryFilteredData = sortedFilteredData;
  const handleTotalCost = () => {
    const costArr = filteredData.map((data) => data.cost);
    return costArr.reduce((prev, cur) => (prev += cur), 0);
  };
  return (
    <>
      <Font>
        {selectedMonth}월 총 지출 : {handleTotalCost().toLocaleString()} 원
      </Font>
      <GraphBack>
        {categoryFilteredData.map((data, i) => (
          <GraphFront
            key={i}
            color={colors[i]}
            width={((data.cost / handleTotalCost()) * 100).toFixed(2)}
          />
        ))}
      </GraphBack>

      <GraphItem>
        {sortedFilteredData.length
          ? sortedFilteredData.map((data, i) => (
              <GraphItem key={i}>
                <GraphColor color={colors[i]} />
                {data.category}: {data.cost.toLocaleString()}원 (
                {((data.cost / handleTotalCost()) * 100).toFixed(2)}%)
              </GraphItem>
            ))
          : null}
      </GraphItem>
    </>
  );
}
export default GraphRecords;
