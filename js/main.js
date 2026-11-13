import { fetchMovies } from "./api.js";
import { renderMovies, createCard } from "./ui.js";
import { searchMatch, FilterMatch } from "./filter.js";
import { displayFavorites } from "./favorite.js";

document.addEventListener("DOMContentLoaded", async () => {
  const moviesGrid = document.getElementById("moviesGrid");
  const searchInput = document.getElementById("searchFilm");
  const getKind = document.getElementById("genreFilter");
  const pagination = document.getElementById("pagination");

  function showPage(list, page = 1) {
    let start = (page - 1) * 8;
    let end = page * 8;
    renderMovies(list.slice(start, end), moviesGrid, createCard);

    const totalPages = Math.ceil(list.length / 8);
    pagination.innerHTML = "";

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        let activeClass = "bg-slate-800 hover:scale-105";
        if (i == page) {
          activeClass = "bg-red-600 hover:scale-105";
        }
        pagination.innerHTML += `<button data-page="${i}" class="px-3 py-1 rounded ${activeClass}">${i}</button>`;
      }

      pagination.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => showPage(list, Number(btn.dataset.page)));
      });
    }
  }

  try {
    const movies = await fetchMovies();

    function updateCatalog() {
      const searched = searchMatch(movies, searchInput.value);
      const filtered = FilterMatch(searched, getKind.value);
      showPage(filtered, 1);
    }

    displayFavorites();
    updateCatalog();

    searchInput.addEventListener("input", updateCatalog);
    getKind.addEventListener("change", updateCatalog);

  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    moviesGrid.innerHTML = `<p class="col-span-4 text-center text-red-500 py-8">Impossible de charger les données. Veuillez réessayer plus tard.</p>`;
  }
});