import { React } from "react";
import { Jumbotron as Jumbo,Button,Row,Col} from 'react-bootstrap';
import Navbar from './Navbar';
import styled from 'styled-components';
import { Link } from "react-router-dom";




export const HeaderC = (props) => {
const Title = styled.h1`
    font-size: 2.5em;
    text-align: Left;
    font-family: Zapf-Chancery;
    font-style:oblique;
    color: white;
    padding:20px;
  `;
const StyledContainer = styled.section`
  width:100% ;
  padding: 0px;
  margin: 0 auto;
  margin-top:0;
  color:#7A8B99;
.jumbor{
    background:#49c6e5;
}
.myButton {
	box-shadow: 0px 5px 0px 0px #192b2e;
	background-color:#49c6e5;
	border-radius:4px;
	border:4px solid #027dcf;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Times New Roman;
	font-size:28px;
	font-weight:bold;
	padding:12px 76px;
	text-decoration:none;
	text-shadow:1px -3px 0px #3d768a;
}
.myButton:hover {
	background-color:#027dcf;
}
.myButton:active {
	position:relative;
	top:1px;
}



`;
  
    return (
        
        <StyledContainer>
            <Jumbo flex className="justify-content-center jumbor">
                <Row>
                    <Col auto>
                    <Title>{props.message}</Title>
                    </Col>
                    <Col md={{ span: 3, offset: 6 }} >
                <a href="http://localhost:8080/api/logout" className="myButton">
         
           Logout
         </a></Col></Row>
                <Navbar/>
                
              
            </Jumbo>
           
            </StyledContainer>
        
    );
}
