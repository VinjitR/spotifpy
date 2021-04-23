import React,{useEffect,useState} from 'react';

import {useForm} from "react-hook-form";
import "./css/search.css";
import { HeaderC } from './HeaderC';
import {FooterC} from './FooterC';
export default function SpotifySearch() {

  const [track, settrack] = useState([]);
  const [artist, setartist] = useState([]);
  const [album, setalbum] = useState([]);
  const [playlist, setplaylist] = useState([]);
  
  const {  register, handleSubmit } = useForm();
  const onSubmit=async(data)=>{
    console.log('submit');
    console.log(data);
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    const obj = JSON.parse(jsonData);
    if (data.type=='artist'){
        setartist(obj.artists);
        console.log(artist);
    }
    else if (data.type=='track'){
      settrack(obj.tracks);
      console.log(track);


    }
    else if (data.type=='album'){
      setalbum(obj.albums);
      console.log(album);
    }
    else{
      setplaylist(obj.playlists);
      console.log(playlist);
    }
      // // .then(res => res.json())
      // .then(res =>res.json())
      // .then(res=>{response=res.json();})

  }
  return (
    <>
    <HeaderC message="Search"/>
    <div className="container src">
      <div className="col-sm-12">
        <h3>Spotify Search</h3>
      </div>
      <div className="col-sm-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              name="Search"
              {...register("search")}
            />

          </div>
      <div className="form-group">
        <select className="form-select col-sm-6" aria-label="Default select example"{...register("type")}>
          <option selected value="track">Track</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="playlist">Playlist</option>
          
          </select>
          </div>
            
          <div className="form-group">
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
    <div className="results container">
      <h2>Search Results</h2>
      {
        track.length!==0 ?<div>
            <h3>Track</h3>

      {
        track.items.map(t=>(
          <div className="row auto rs">
            <div className="col md-5 cls">
          <p><b>Name:</b> {t.name}</p>
          </div>
          <div className="col md-2 cls">
          <p>
            <b>Popularity:</b> {t.popularity}
            </p>
          </div>
          <div className="col md-2 cls">
          <p>
            <a href={t.external_urls.spotify}>Song Link</a>
            </p>
          </div>
         </div>
        ))
        
      }
      
            
        </div>
        :<div>
          <h4></h4>
        </div>
      }
            {
        artist.length!==0 ?<div>
            <h3>Artist</h3>
            {
        artist.items.map(a=>(      
        <div className="row auto justify-content-center pt-4 rs">
              <div className="col md-5 cls">
                  <p><b>Name:</b> {a.name}</p>
                  </div>
                  <div className="col md-2 cls">
                  <p>
                    <b>Followers:</b> {a.followers.total}
                    </p>
                  </div>
                  <div className="col md-2 cls">
                  <p>
                    <a href={a.external_urls.spotify}>See Artist</a>
                    </p>
                  </div>
                  <div className="col md-4 cls">
                    <img src={a.images[2].url} className="img-thumbnail"></img></div>

     </div>
          
        ))
        
      }
      
        </div>
        :<div>
          <h4></h4>
        </div>
      }
            {
        album.length!==0 ?
        <div>
            <h3>Album</h3>
            {
        album.items.map(al=>(
          <div className="row auto rs">
            <div className="col md-5 cls">
          <p><b>Name:</b> {al.name}</p>
          </div>
          <div className="col md-2 cls">
          <p>
            <b>Total Tracks:</b> {al.total_tracks}
            </p>
          </div>
          <div className="col md-2 cls">
          <p>
            <a href={al.external_urls.spotify}>Album Link</a>
            </p>
          </div>
          <div className="col md-4 cls">
                    {
                      al.artists.map(alar=>(
                        <p>{alar.name}
                        </p>
                      ))
                    }
     </div>
         </div>
        ))
        
      }
      
        </div>
        :<div>
          <h4></h4>
        </div>
      }
            {
         playlist.length!==0?<div>
            <h3>Playlist</h3>
            {
        playlist.items.map(p=>(

          <div className="row auto rs">
            <div className="col md-5 cls">
          <p><b>Name:</b> {p.name}</p>
          </div>
          <div className="col md-2 cls">
          <p>
            <b>Description:</b> {p.description}
            </p>
          </div>
          <div className="col md-2 cls">
          <p>
            <a href={p.external_urls.spotify}>Playlist Link</a>
            </p>
          </div>
         </div>
        ))
        
      }
      
        </div>
        :<div>
          <h4></h4>
        </div>
      }
    </div>

      <FooterC/>
    </>
  );


  }