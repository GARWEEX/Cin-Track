
import { fetchMovies } from "./api.js";
//import { renderMovies } from "./ui.js";

document.addEventListener('DOMContentLoaded', async () => {
  //const moviesGrid = document.getElementById('moviesGrid');

  const movies = await fetchMovies();
  console.log("donner recupere avec succes", movies);

  //renderMovies(movies, moviesGrid);
});