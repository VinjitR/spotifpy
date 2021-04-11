import { React } from "react";
import { Jumbotron as Jumbo} from 'react-bootstrap';
import Navbar from './Navbar';
import styled from 'styled-components';




export const HeaderC = (props) => {
const Title = styled.h1`
    font-size: 5.5em;
    text-align: center;
    font: TimesnewRoman;
    color: #124559;
  `;
const StyledContainer = styled.section`
  max-width: 2500px;
  padding: 0px;
  margin: 0 auto;
  color:#7A8B99;
.jumbo{
    background:#598392;
}
`;
  
    return (
        <>
        <StyledContainer>
            <Jumbo flex className="justify-content-center jumbo">
                <Title>{props.message}</Title>
                <Navbar/>
            </Jumbo>
            </StyledContainer>
        </>   
    );
}
