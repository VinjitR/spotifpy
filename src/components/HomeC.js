import React, {useState,useEffect,useInterval} from 'react';
import {Card, Container,Row} from 'react-bootstrap';
import axios from 'axios';
import {HeaderC} from './HeaderC';
import styled from 'styled-components';

const api= axios.create()

const usersurl="/api/profile";


function Home() {
  const Styles = styled.div`
  .cards{
    border:black;
    align-items:left;
    padding:30px;
  },
  backgorund:#EFF6E0
  .home{
    padding:20px;
    background:#EFF6E0;
  }
  `;


    const [userData, setUserData] = useState([]);
    useEffect(() => {
        getUserWithFetch();
      }, []);
  
    const getUserWithFetch = async () => {
        const response = await fetch(usersurl);
        const jsonData = await response.json();
        const useData=jsonData;
        console.log(useData);
        setUserData(useData);      
    };
  
    return (
        
      <Styles>
        <HeaderC message="User Info"/>
        
       <Container flex className="home" >
           <Row justify-content-center>

           
        {userData.map(item=>
        <Card className="cards" style={{ width: '35rem',height:'40rem',padding:0 }}>
            <Card.Img src={item.images[0].url}/>
            <Card.Body>
                <Card.Title>{item.display_name}</Card.Title>
                <Card.Link href={item.external_urls.spotify}>Spotify</Card.Link>
            </Card.Body>
            </Card>)}
            </Row>
            </Container>
            
      </Styles>
      
    );
  }
  
  export default Home;


