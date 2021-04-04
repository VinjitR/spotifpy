import styled from 'styled-components';
import {Jumbotron as Jumbo } from 'react-bootstrap';
import {Container} from 'react-bootstrap'; 

const Styles = styled.div`
  .jumbo {
    height: 500px;
    position: relative;
    background-color:#E1E5F2;
    padding:70px 80px 70px 30px;
    margin:0px auto;
    
  }

  .header-c{
    width:auto;
    
  }
  h1{
    font-family:sans-serif;
    font-size: 45px;
    color: #1F7A8C;
   
    
  }
  
  
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
    <Container className="header-c">
    <div className='row row-header'>
        <div className="col-lg-10 ">
            <h1 >SPOTIFY LOGIN</h1>
                </div>
              
            </div>
        </Container>
        </Jumbo>
        
    </Styles>)