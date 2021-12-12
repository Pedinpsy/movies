import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './MoviesList.css'
import SliderButton from './SliderButton'

import Modal from 'react-modal';
import "react-modal-overlay/dist/index.css";
const customStyles = {
  overlay:{zIndex:999},
  content: {
    zIndex:999,
    top: '50%',
    left: '50%',
    width: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class MoviesList extends PureComponent {  
  

  openModal = () =>{
    this.setState({
      modalIsOpen: true})

  }
  closeModal = () =>{   
    this.setState({
      modalIsOpen: false})

  }
  static propTypes = {
    movies: PropTypes.array.isRequired,
   
  }

  state = {
    selectedMovie: {},
    movies: {},
    sort:(a) => {return a}
  
  }

  handleSelectMovie = item => {
    this.setState({selectedMovie: item})
    this.openModal()

  }

  handleSortingChange = sortingFunction => {

    this.setState({sort: sortingFunction} )
  }

  onClickNext = () =>{
   
    var div = document.getElementById("container"+this.props.numberOfrow)
    document.getElementById("container"+this.props.numberOfrow).scroll(div.scrollLeft+1000,0)
  }
  onClickPrev = () =>{
    var div = document.getElementById("container"+this.props.numberOfrow)
    document.getElementById("container"+this.props.numberOfrow).scroll(div.scrollLeft-1000,0)
  }

  
  render() {
    const {movies} = this.props
    const {numberOfrow} = this.props
    const {selectedMovie} = this.state    
    return (
    <div>  
      <div>
        <span>Sort by:</span>
          <SortingOptions onChange={this.handleSortingChange}/>
        </div>
      <div className="upconteiner">

        <div id ={"container"+numberOfrow} className="container"> 
           <SliderButton  onClick = {this.onClickNext} type="next" />
            <SliderButton onClick = {this.onClickPrev} type="prev" />      
          {
            this.state.sort(movies).map(movie =>
              <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={this.handleSelectMovie}/>
            )
            }

        </div>  
      </div>
     
      <Modal isOpen={this.state.modalIsOpen}        
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Movie">
          <div className ="close">
           <span styles="float:rigth" onClick={this.closeModal}>X</span>           
           </div>
        <div className="description">
          <h2>{selectedMovie.title}({selectedMovie.original_title})</h2>
          <div><strong>Rank</strong>:{selectedMovie.vote_average}({selectedMovie.vote_count}) <span></span></div>
          <div><strong>Popularuty</strong>:{selectedMovie.popularity} <span></span></div>
          <div><strong>Overview</strong>:{selectedMovie.overview} <span></span></div>
          <div><strong>Release date </strong>:{selectedMovie.release_date} <span></span></div>
        </div>
      </Modal>
      </div>
    
    )
  }
}
class MovieListItem extends Component {
  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }
  render() {
    const {movie: {title, vote_average,poster_path,backdrop_path}, isSelected} = this.props
    return (
   
        <div style={ {backgroundImage:`url(https://image.tmdb.org/t/p/w500/${poster_path}),url(https://bitsofco.de/content/images/2018/12/broken-1.png)`,backgroundRepeat: "no-repeat", backgroundSize:"90%",backgroundPosition: "center"} } className={classNames('item', {'selected': isSelected})} onClick={this.handleClick}>
     
      

      </div>
    )
  }
}
class SortingOptions extends Component {
  state = {
    value: '',
    sortFunctions :{}
  }

 sortFunctions =
  {
    "name_asc": {
      "function" : function(movieList){
      return movieList.sort((a, b) => a.title.localeCompare(b.title))},
      "label": "A -> Z",    
    },
    "name_desc": {
      "function" : function(movieList){
      
      return movieList.sort((a, b) => b.title.localeCompare(a.title))},
      "label": "Z -> A",    
    },
    "rating": {
      "function" : function(movieList){
    
      return movieList.sort((a, b) =>a.vote_average-b.vote_average)},
      "label": "Rating",    
    },
    

  }
  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    
    onChange(this.sortFunctions[selectedValue].function)
  }


  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>      
              
        <option value="name_asc">A -> Z</option>
        <option value="name_desc">Z -> A</option>
        <option value="rating">Rating</option>
      </select>
    )
  }
}

