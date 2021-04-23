import React, {useState,useEffect,useInterval} from 'react';
import {Card, Container,Row,Col,Button} from 'react-bootstrap';
import axios from 'axios';
import {HeaderC} from './HeaderC';
import styled from 'styled-components';
import pic from './images/no_profile_pic.png';
import {userdetailsC} from './UserdetailsC';
import {Link} from 'react-router-dom';
import {FooterC} from './FooterC';
const api= axios.create()

const usersurl="/api/profile";


function Home() {
  const Styles = styled.div`
  
  backgorund:#
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
    function getimgUrl(i){
      if (i.images.length === 0 ) {
        return pic;
      }
      return i.images[0].url;
    }
    return (
        
      <Styles>
        <HeaderC message="User Info"/>
        
       <Container flex className="home" >
           


        {userData.map(item=>
        <Card border="dark" className="cards" style={{ width: '25rem',height:'auto',padding:10 }}>
          <Row justify-content-center mt="5">
            
            <Card.Img src={getimgUrl(item)}/>
            <Col xs-lg>
            <Card.Body>
                <Card.Title>{item.display_name}</Card.Title>
                <Card.Link href={item.external_urls.spotify}>Spotify</Card.Link>
                <Card.Text>followers:{item.followers.total}</Card.Text>
                <Card.Text>id:{item.id}</Card.Text>
            </Card.Body>
            </Col>
            </Row>
            </Card>)}
            
            </Container>
            <FooterC/>
      </Styles>

      
      
    );
  }
  
  export default Home;


