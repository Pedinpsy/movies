import React from 'react'
import './TMDBImage.css'
const TMDB_IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w500/'

const TMDBImage = ({src, ...restProps}) => (
  <img onerror="this.src='../resources/images/none.jpg'" src={`${TMDB_IMAGE_BASE_PATH}${src}`} {...restProps}/>
)

export default TMDBImage