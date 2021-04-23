import React from 'react';
import styled from 'styled-components';
import {Jumbotron as Jumbo} from 'react-bootstrap';
const StyledContainer = styled.section`
width=100%;

margin: 0px auto;
padding:Opx;
height:20px;
bottom:0;
color:#7A8B99;
.jumbo{
  background:#49c6e5;
  max_height:300px;
}`;

export const FooterC = () => {
  return (
    <>
      <StyledContainer>
            <Jumbo fluid className="justify-content-center jumbo">

            </Jumbo>
            </StyledContainer>
    </>
  )
}

