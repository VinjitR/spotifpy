import { React, useState ,useEffect} from "react";
import {Jumbotron} from './JumbotronC';
import styled from 'styled-components';
import {Container,Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Styles = styled.div`

  .Loginbtn{
    color:#022B3A;
  }
  .cnt{
      margin-top:20px
  }
  
`;



export const Login=()=>(
  <div>
     <Styles>
     <Jumbotron/>
     <Container mt="auto" className="cnt">
     <Row className="justify-content-md-center">
         <Col md="6">
         <a href="http://localhost:8080/auth">
         <Button className="Loginbtn"block size="lg" type="submit" variant="primary"
         >
           Login
         </Button>
         </a>
                 </Col>
                 </Row>
                </Container>     
     </Styles>
     </div>
)