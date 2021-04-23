import styled from 'styled-components';
import {Jumbotron as Jumbo } from 'react-bootstrap';
import {Container} from 'react-bootstrap'; 

const Styles = styled.div`
margin-top:0;

  .header-c{
    width:auto;
    fill:auto;
    margin:0%;
    background-color:azure;
  }
  h1{
    font-family:Montserrat;
    font-size: 68px;
    color: white;
    margin-left:400px;
    padding-left:350px;
    padding-top:20px;
    
  }
  
  
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
    </Jumbo>
    <div className='row row-header justify-content-left align-left rh'>
        <div className="col-auto">
            <h1><b><i>SPOTIFY LOGIN</i></b></h1>
                </div>
              
            </div>
        
        
        
    </Styles>)