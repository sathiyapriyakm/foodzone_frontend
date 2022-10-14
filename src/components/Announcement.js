import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-color: #fbf0f4;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  letter-spacing:0.2rem;
  font-family:monospace;
  padding-top:10px;
  padding-bottom:10px;
`;

const Announcement = () => {
  return <Container>
    {/* <span><img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/qwelcome_.png" alt="2324"/> </span> */}
    Super Deal! Free delivery on Orders Over Rs.999</Container>;
};

export default Announcement;