export function createCard(movie) {
  return `
   <div class="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-3 hover:border-slate-700 transition-colors">
  <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-full h-56 object-cover rounded-lg mb-3">
  <h3 class="text-base font-bold text-white">${movie.title}</h3>
  <span class="text-xs text-slate-400 mt-1">•Type : ${movie.type || ''}</span>
  <p class="text-xs text-slate-400 mt-1">• ${movie.releaseYear || ''} </p> 
</div>
  `;
}

export function renderMovies(movies, container) {
  container.innerHTML = movies.map(createCard).join('');
}