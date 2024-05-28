import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FamilyContext } from "../../context/FamilyContext";
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

function FooterRecords() {
  const navigate = useNavigate();
  const { filteredDatas } = useContext(FamilyContext);

  const handleGoDetail = (recordId) => {
    const data = filteredDatas.filter((data) => data.id === recordId);
    navigate(`/records/${recordId}`, {
      state: {
        data,
        recordId,
      },
    });
  };
  return (
    <FlexContainer>
      {filteredDatas.length ? (
        filteredDatas.map((data) => (
          <Card key={data.id} onClick={() => handleGoDetail(data.id)}>
            <CardItem>
              <Font size={"14px"} color={"var(--grey-color)"} weight={"100"}>
                {data.date}
              </Font>
              <Font size={"16px"} color={"var(--blue-color)"} weight={"bold"}>
                {data.item}-
                {data.description.length > 42
                  ? data.description.slice(0, 43) + "..."
                  : data.description}
              </Font>
            </CardItem>

            <Font size={"16px"} color={"var(--blue-color)"} weight={"bold"}>
              {data.amount.toLocaleString()} 원
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
