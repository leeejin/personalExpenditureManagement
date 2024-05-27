import styled from "styled-components";
import AddRecord from "../AddRecord/AddRecord";
import FooterRecords from "../FooterRecords/FooterRecords";
import GraphRecords from "../GraphRecords/GraphRecords";
import MonthRecord from "../MonthRecord";
const Section = styled.section`
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
`;

function HomeRecords() {
  return (
    <>
      <Section>
        <AddRecord />
      </Section>

      <Section>
        <MonthRecord />
      </Section>

      <Section>
        <GraphRecords />
      </Section>

      <Section>
        <FooterRecords />
      </Section>
    </>
  );
}

export default HomeRecords;
