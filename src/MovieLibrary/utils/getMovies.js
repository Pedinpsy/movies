  
  export const getMovies = async (page) => { 
    var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=${page}`;  
    return await fetch(url, { method: "GET" })
      .then((data) => data.json())
      .catch((error) => console.log(error));
  };