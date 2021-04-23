import React, { useState,useEffect} from 'react';
import { FooterC } from './FooterC';
import {HeaderC} from './HeaderC';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container,Spinner,Card,Row,Col } from 'react-bootstrap';
import './css/styles.css';

function AGRecomms(props) {
const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
  const artist_rc_url="/api/artistrecomm"
  //Artist Recommendation
  const[Reca,setReca]=useState([])
  const[Loading,setLoading]=useState(true);
  const getReca = async () => {
    const response = await fetch(artist_rc_url);
    const jsonData = await response.json();
    const useData=jsonData;
    console.log(useData);
    setReca(useData);
    
    setLoading(false);     
};
  useEffect(() => {
    getReca();
  }, []);



const Loader = () => {
    return (
        <div className="container RC">
        <div className="container lg">
        <h2>Loading</h2>
        <Spinner animation="border" variant ="light"size="sm" />
        
        <Spinner animation="grow" variant ="light"size="lg" />
        </div>
        </div>
    )
}

const classes = useStyles();
    return (
        <div >
          <HeaderC message="Artist and Genre Recommendation"/>
          {Loading?<Loader/>:
          <Container>
            <h2>Artists</h2>
              <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Artist_Name</TableCell>
                    <TableCell align="right">Popularity</TableCell>
                    {/* <TableCell align='right'><Link to='/horchart'><Button primary></Button></Link></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Reca[0].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.artist_name}
                      </TableCell>
                      <TableCell align="right">{row.popularity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Container>
                <h3>Genres</h3>
            <Row pl="15rem">
            
            {Reca[1].map((g)=>
            <Col mt="3rem" pt="2%">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{g}</Card.Title>
                </Card.Body>
                </Card>
            </Col>
            )}
                </Row>
                </Container>
            </Container>

            }
          <FooterC/>
        </div>
    )
}


export default AGRecomms;