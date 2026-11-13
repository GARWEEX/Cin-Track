import { getFavorites, saveFavorites } from "./storage.js";

let favorites = getFavorites();

export function isFavorite(id) {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id == id) {
      return true;
    }
  }
  return false;
}

export function toggleFavorite(movie) {
  if (isFavorite(movie.id)) {
    favorites = favorites.filter(m => m.id != movie.id);
  } else {
    favorites.push(movie);
  }

  saveFavorites(favorites);
  displayFavorites();
}

export function displayFavorites() {
  const container = document.getElementById("favoritesList");
  if (!container) return;

  const counts = favorites.reduce((acc, item) => {
    if (item.type === "movie") {
      acc.movies += 1;
    } else if (item.type === "series") {
      acc.series += 1;
    }
    return acc;
  }, { movies: 0, series: 0 });

  if (favorites.length == 0) {
    container.innerHTML = `<p>No favorites added yet.</p>`;
    return;
  }

  container.innerHTML = `
    <p class="text-slate-300 mb-3 pb-2 border-b border-slate-800">
      Films : <span class="text-white font-bold">${counts.movies}</span> | 
      Séries : <span class="text-white font-bold">${counts.series}</span>
    </p>
  `;

  favorites.forEach(movie => {
    container.innerHTML += `
      <div class="flex items-center justify-between bg-slate-800 p-2 rounded mb-2 hover:scale-105">
        <div class="flex items-center gap-2">
          <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-10 h-14 object-cover rounded">
          <div>
            <p class="text-white text-sm font-bold">${movie.title}</p>
            <span class="text-xs text-slate-400">${movie.releaseYear || ''}</span>
          </div>
        </div>
        <button class="remove-fav text-red-500 font-bold text-lg px-2" data-id="${movie.id}">&times;</button>
      </div>
    `;
  });

  const removeBtns = container.querySelectorAll(".remove-fav");
  removeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      favorites = favorites.filter(m => m.id != id);
      saveFavorites(favorites);
      displayFavorites();

      let heartBtn = document.querySelector(`.fav-btn[data-id="${id}"]`);
      if (heartBtn) {
        heartBtn.classList.remove("text-red-500");
        heartBtn.classList.add("text-gray-400");
      }
    });
  });
}