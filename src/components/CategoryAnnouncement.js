import { Subtitles } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  height: 70px;
  background-color:lightseagreen;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  font-size: 20px;
  font-weight: 500;
  margin-top:5px;
  padding-top:5px;
  padding-bottom:5px;
`
const Title=styled.h2`
color:black;
`;

const CategoryAnnouncement = () => {
  return <Container>
    <Title>Our Categories</Title>
    
    </Container>;
};

export default CategoryAnnouncement;
  ;