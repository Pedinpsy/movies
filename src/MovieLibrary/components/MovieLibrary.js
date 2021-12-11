import React, { Component } from 'react'
import logo from './logo.svg'
import './MovieLibrary.css'
import {getMovies} from '../utils/getMovies'
import MoviesList from './MoviesList'

class MovieLibrary extends Component {

  static propTypes = {
  
  }

  state = {
    movies : []
  } 

  async componentDidMount() {

    var allMovies = []
    for( var i = 1 ; i <4; i ++){
       var aux = (await getMovies(i))
      console.log(aux)
      allMovies =  allMovies.concat(aux.results)
      console.log(allMovies)
    }
    this.setState({movies:allMovies})
   
  }
  render() {    
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <img src={logo} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>
        <div className="ML-intro">
          {this.state.movies.length && <MoviesList movies={this.state.movies}/> }
        </div>
      </div>
    );
  }
}

export default MovieLibrary