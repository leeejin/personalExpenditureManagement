import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
`;
const NoDataBox = styled.div`
  text-align: center;
  background-color: var(--lightwhite-color);
  padding: 20px;
  color: var(--grey-color);
  font-size: 16px;
`;
const Card = styled.div`
  background-color: var(--lightwhite-color);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  text-align: left;
  &:hover {
    transform: scale(1.03);
    transition: all 0.3s ease-in-out 0s;
    cursor: pointer;
  }
`;
const CardItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Font = styled.span`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

function FooterRecords({ filteredData }) {
  console.log(filteredData);
  const navigate = useNavigate();
  const handleGoDetail = (recordId) => {
    navigate(`/records/${recordId}`, {
      state: {
        filteredData,
        recordId,
      },
    });
  };
  return (
    <FlexContainer>
      {filteredData.length ? (
        filteredData.map((data) => (
          <Card key={data.id} onClick={() => handleGoDetail(data.id)}>
            <CardItem>
              <Font size={"14px"} color={"var(--grey-color)"} weight={"100"}>
                {data.date}
              </Font>
              <Font size={"16px"} color={"var(--blue-color)"} weight={"bold"}>
                {data.category}-
                {data.content.length > 42
                  ? data.content.slice(0, 43) + "..."
                  : data.content}
              </Font>
            </CardItem>

            <Font size={"16px"} color={"var(--blue-color)"} weight={"bold"}>
              {data.cost.toLocaleString()} 원
            </Font>
          </Card>
        ))
      ) : (
        <NoDataBox>지출이 없습니다</NoDataBox>
      )}
    </FlexContainer>
  );
}
export default FooterRecords;
