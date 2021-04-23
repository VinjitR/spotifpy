import React, { useState } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {HeaderC} from './HeaderC';

export const UserdetailsC = () => {

    const [userTrack,setUserTrack]=useState([]);

    return (
        <>
            <HeaderC message="User Details"/>
        
        <Container flex className="home" >
            <Row justify-content-center mt="5">
        </Row>
        </Container>
        </>
    )
}
