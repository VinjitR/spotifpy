import React, { useState,useEffect} from 'react';
import { FooterC } from './FooterC';
import {HeaderC} from './HeaderC';
import {Card, Container,Row,Col,Spinner} from 'react-bootstrap';
import pic from './images/no_profile_pic.png';
import './css/styles.css';

function UserRecomms(props) {
  // const artist_rc_url="/api/artistrecomm"
  const user_rc_url="/api/userrecomm"
//   //Artist Recommendation
//   const[Reca,setReca]=useState([])
//   const getReca = async () => {
//     const response = await fetch(artist_rc_url);
//     const jsonData = await response.json();
//     const useData=jsonData;
//     console.log(useData);
//     setReca(useData);      
// };
//   useEffect(() => {
//     getReca();
//   }, []);

//User Recommendation
  const[Recu,setRecu]=useState([]);
  const[Loading,setLoading]=useState(true);
  const getRecu = async () => {
    const response = await fetch(user_rc_url);
    const jsonData = await response.json();
    const useData1=jsonData;
    console.log(useData1);
    setRecu(useData1);
    setLoading(false);    
};
  useEffect(() => {
    getRecu();

  }, []);


const Loader = () => {
  return (
      <div className="container RC">
        <div className="container lg">
      <h2>Loading</h2>

      <Spinner animation="border"  varaint ="light" size="sm" />
      
      <Spinner animation="grow"  variant ="light" size="lg" />
      </div>
      </div>
  )
}
  
function getimgUrl(i){
  if (i.images.length === 0 ) {
    return pic;
  }
  return i.images[0].url;
}

    return (
        <div>
          <HeaderC message="User Recommendation"/>
          {Loading?<Loader/>:<Container flex className="RecomU" >
            <h2 className="ur2">Similar Users in this App</h2>
           <Row mt="5">
        {Recu.map(item=>
        <Col>
        <Card border="dark" className="cards" style={{ width: '25rem',height:'34rem',padding:10 }}>
            <Card.Img src={getimgUrl(item)}/>
            <Card.Body>
                <Card.Title>{item.display_name}</Card.Title>
                <Card.Link href={item.external_urls.spotify}>Spotify</Card.Link>
                
            </Card.Body>
            </Card></Col>)}
            
            </Row>
            </Container>}
          <FooterC/>
        </div>
    )
}


export default UserRecomms;

