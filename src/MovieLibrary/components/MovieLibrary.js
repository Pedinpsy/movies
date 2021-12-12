import React, { Component } from 'react'
import logo from './logo.svg'
import './MovieLibrary.css'
import {getMovies} from '../utils/getMovies'
import MoviesList from './MoviesList'
import { useEffect, useState, useRef } from 'react';



const MovieLibrary=() => {
  const [movies = [], setMovies] = useState([]);
  const [numPage, setNumPage] = useState([]);
 

  onscroll= (event) => {
    console.log(document.documentElement.offsetHeight)
    console.log(window)
    console.log(event.path[1].scrollY + window.innerHeight )
    if(window.scrollY + window.innerHeight >= document.documentElement.offsetHeight-100 ){
      
      
        getMovies(numPage+1).then((e)=>{
          setMovies((prev) => [...prev, e.results] );
    
        }
        
        
        ) 
        setNumPage(numPage+1) 
     
    }
    
  }


   componentDidMount:{  

    var movies1 = []

    useEffect(() => {
    getMovies(1).then((e)=>{
      setMovies((prev) => [...prev, e.results] );

    }
    
    
    )  
  },[])

  useEffect(() => {
    getMovies(2).then((e)=>{
      setMovies((prev) => [...prev, e.results] );

    }
    
    
    )  
  },[])
  
  useEffect(() => {
    getMovies(3).then((e)=>{
      setMovies((prev) => [...prev, e.results] );

    }
    
    
    )  
    setNumPage(3)
  },[])
      

    
   
  }   
    return (
        <div overflowY="scroll" onscroll={onscroll} className="MovieLibrary">
        <header className="ML-header">
          <img src={logo} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>

        {movies.map((e,index) => (
          <div className="ML-intro">
          {movies.length && <MoviesList numberOfrow = {index} movies={e}/> }
        </div>
      ))}
       
  
    

      </div>
    );
  
};

export default MovieLibrary