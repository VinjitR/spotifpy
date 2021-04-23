import { React, useState ,useEffect} from "react";
import {Jumbotron} from './JumbotronC';
import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const Styles = styled.div`

  .Loginbtn{
    color:#Black;
    font-color:White;
  }
  .cnt{
      margin-top:0px;
      align-content-items:center;
      min-height:300px;
  }
  .roer{
    padding-top:100px
  }
  
`;



export const Login=()=>(
  <>
     <Styles>
     <Jumbotron/>
     <Container  className="cnt">
     <Row className="justify-content-md-center mt-2 roer">
         <Col md="6" mt="5" m="-20px" >
         <a href="http://localhost:8080/auth">
         <Button className="Loginbtn" block size="lg" type="submit" variant="dark"
         >
           Login
         </Button>
         </a>
                 </Col>
                 </Row>
                </Container>     
     </Styles>
     </>
)