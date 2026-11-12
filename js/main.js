import { fetchMovies } from "./api.js";
import { renderMovies, createCard } from "./ui.js";
import { searchMatch } from "./filter.js";

document.addEventListener("DOMContentLoaded", async () => {
  const moviesGrid = document.getElementById("moviesGrid");
  const searchInput = document.getElementById("searchFilm");

  try {
    const movies = await fetchMovies();

    console.log("Données récupérées avec succès", movies);

    renderMovies(movies, moviesGrid);

    searchInput.addEventListener("input", () => {
      const searchResult = searchMatch(movies, searchInput.value);

      renderMovies(searchResult, moviesGrid);
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
});