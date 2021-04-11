import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HeaderC } from './HeaderC';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function Trending() {

    const trendartistsurl="api/trending_artists";
    const trendtracksurl="api/trending_tracks";

    const [tracks, settracks]=useState([]);
    const [artists,setartists]=useState([]);

    const getTracks = async () => {
        const response = await fetch(trendtracksurl);
        const jsonData = await response.json();
        const usemData=jsonData;
        console.log(usemData);
        settracks(usemData);      
    };




    useEffect(() => {
        getTracks();
        const interval=setInterval(()=>{
            getTracks();
        },5000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    const getArtists = async () => {
        const response = await fetch(trendartistsurl);
        const jsonData = await response.json();
        const usedData=jsonData;
        console.log(usedData);
        setartists(usedData);      
    };
    useEffect(() => {
        getArtists();
        const interval=setInterval(()=>{
            getArtists();
        },5000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    const classes = useStyles();

  return (
      <div>
          <HeaderC message="Trending"/>
          <h2>Trending Tracks Realtime</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tracks</TableCell>
            <TableCell align="right">Artists</TableCell>
            <TableCell align="right">Trend</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.track_name}
              </TableCell>
              <TableCell align="right">{row.track_artist}</TableCell>
              <TableCell align="right">{row.track_trend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <h2>Trending Artists Realtime</h2>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Artists</TableCell>
              <TableCell align="right">Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.artist_name}
                </TableCell>
                <TableCell align="right">{row.artist_trend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  );
}

