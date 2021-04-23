import react from "react";
import { Nav,Button} from "react-bootstrap";
import styled from 'styled-components';




export default function Navbar() {

const Button = styled.button`
    color: #2EB9DC;
    font-size: 1em;
    margin: 0em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
  `;
  const Styles = styled.div`
.navigation{
    padding:0;
    background:#002129;
    align-items:right;
}
.navs{
    color:#2EB9DC;
    font-style:oblique;
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
            <Nav.Link href="/search" className="navs">Spotify search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href ="/Trends" className="navs"> Trends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/recommenu" className="navs">
                User-Recommendation
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/recommena" className="navs">
                Artist-Recommendation
                </Nav.Link>
            </Nav.Item>
            </Nav>  
        </Styles>
        </div>
    )
}
