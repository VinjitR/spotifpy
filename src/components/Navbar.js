import react from "react";
import { Nav,Button} from "react-bootstrap";
import styled from 'styled-components';




export default function Navbar() {

const Button = styled.button`
    color: #C1B8C8;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
  `;
  const Styles = styled.div`
.navigation{
    padding:0;
    background:#AEC3B0;
    align-items:right;
}
.navs{
    color:black;
}
  `;

    return (
        <div>
        <Styles>
          <Nav className="justify-content-right navigation" fill variant="tabs" defaultActiveKey="/Home">
            <Nav.Item>
            <Nav.Link href="/home" className="navs">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link-1" className="navs">Spotify search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href ="/Trends" className="navs"> Trends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" className="navs" disabled>
                Recommendations
                </Nav.Link>
            </Nav.Item>
            </Nav>  
        </Styles>
        </div>
    )
}
