import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }
`;
const Button = styled.button`
  background-color: var(--blue-color);
  color: var(--white-color);
  &:hover {
    background-color: var(--darkblue-color);
  }
`;
function AddRecord() {
  const handleSubmit = () => {
    const formData = {
      date: document.getElementById("date").value,
      category: document.getElementById("category").value,
      cost: document.getElementById("cost").value,
      content: document.getElementById("content").value,
    };
    const error = {
      date: `${formData.date.slice(0, 4)}-${formData.date.slice(
        5,
        7
      )}-${formData.date.slice(9)}`,
      category: !formData.category.length,
      cost: formData.cost <= 0,
      content: !formData.content.length,
    };
    if (!(error.date || error.category || error.cost || error.content))
      console.log(formData);
  };
  return (
    <>
      <Container>
        <div>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            placeholder="YYYY-MM-DD"
            defaultValue="2024-01-01"
          />
        </div>
        <div>
          <label htmlFor="category">항목</label>
          <input type="text" id="category" placeholder="지출 항목" />
        </div>
        <div>
          <label htmlFor="cost">금액</label>
          <input type="number" id="cost" placeholder="지출 금액" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" placeholder="지출 내용" />
        </div>
        <div>
          <Button onClick={handleSubmit}>저장</Button>
        </div>
      </Container>
    </>
  );
}
export default AddRecord;
