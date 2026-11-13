import { isFavorite, toggleFavorite } from "./favorite.js";

export function createCard(movie) {
  let heartColor = "text-gray-400";
  if (isFavorite(movie.id)) {
    heartColor = "text-red-500";
  }

  return `
    <div class="movie-card relative bg-slate-900 border border-slate-800 rounded p-3 cursor-pointer hover:scale-105" data-id="${movie.id}">
      <button class="fav-btn absolute top-4 right-4 bg-slate-950 px-2 py-0.5 rounded text-lg ${heartColor}" data-id="${movie.id}">♥</button>
      <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-full h-56 object-cover rounded mb-2">
      <h3 class="text-base font-bold text-white">${movie.title}</h3>
      <p class="text-xs text-slate-400 mt-1">• Type : ${movie.type || ''}</p>
      <p class="text-xs text-slate-400 mt-1">• ${movie.releaseYear || ''}</p> 
    </div>
  `;
}

export function renderMovies(movies, container, cardCallback = createCard) {
  if (!container) return;

  container.innerHTML = movies.map(cardCallback).join('');

  const favBtns = container.querySelectorAll('.fav-btn');
  favBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Bonus : empêche l'ouverture de la modal

      const movieId = btn.getAttribute('data-id');
      const movie = movies.find(m => m.id == movieId);
      if (movie) {
        toggleFavorite(movie);
        if (isFavorite(movie.id)) {
          btn.classList.remove('text-gray-400');
          btn.classList.add('text-red-500');
        } else {
          btn.classList.remove('text-red-500');
          btn.classList.add('text-gray-400');
        }
      }
    });
  });

  const modal = document.getElementById('movieModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModal');

  const cards = container.querySelectorAll('.movie-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const movieId = card.getAttribute('data-id');
      const movie = movies.find(m => String(m.id) === String(movieId));

      if (movie) {
        let extraInfo = "";
        if (movie.type === "movie") {
          extraInfo = `<p>• Durée : ${movie.duration || ''} min</p>`;
        } else {
          let nbSeasons = Array.isArray(movie.seasons) ? movie.seasons.length : movie.seasons;
          extraInfo = `<p>• Saisons : ${nbSeasons || ''}</p>`;
        }

        modalContent.innerHTML = `
          <div class="bg-slate-900 rounded p-2 text-sm space-y-1">
            <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-full h-72 object-cover rounded mb-3">
            <h3 class="text-lg font-bold text-white">${movie.title}</h3>
            <p class="pt-2 text-slate-300">• description : ${movie.description || ''}</p>
            <p class="pt-2 text-slate-300">• Type : ${movie.type || ''}</p>
            <p class="pt-2 text-slate-300">• Année : ${movie.releaseYear || ''}</p>
            ${extraInfo}
            <p class="pt-2 text-slate-300">• Genres : ${movie.genres || ''}</p>
            <p class="pt-2 text-slate-300">• Réalisateurs : ${movie.directors || ''}</p>
            <p class="pt-2 text-slate-300">• Pays : ${movie.productionCountries || ''}</p>
        
            
          </div>
        `;
        modal.classList.remove('hidden');
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}