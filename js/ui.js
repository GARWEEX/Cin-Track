export function createCard(movie) {
  return `
    <div class="movie-card bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-4 hover:border-slate-700 transition-colors cursor-pointer" data-id="${movie.id}">
      <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-full h-56 object-cover rounded-lg mb-3 pointer-events-none">
      <h3 class="text-base font-bold text-white pointer-events-none">${movie.title}</h3>
      <span class="text-xs text-slate-400 mt-1 block pointer-events-none">• Type : ${movie.type || ''}</span>
      <p class="text-xs text-slate-400 mt-1 pointer-events-none">• ${movie.releaseYear || ''}</p> 
    </div>
  `;
}

export function renderMovies(movies, container) {
  if (!container) return;

  container.innerHTML = movies.map(createCard).join('');

  const modal = document.getElementById('movieModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModal');

  const cards = container.querySelectorAll('.movie-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const movieId = card.getAttribute('data-id');
      const movie = movies.find(m => String(m.id) === String(movieId));

      if (movie) {
        modalContent.innerHTML = `
        <div class="movie-card bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-4 hover:border-slate-700 transition-colors cursor-pointer" data-id="${movie.id}">
      <img src="${movie.poster || movie.image}" alt="${movie.title}" class="w-full h-56 object-cover rounded-lg mb-3 pointer-events-none">
      <h3 class="text-base font-bold text-white pointer-events-none">${movie.title}</h3>
      <h3>• description : ${movie.description} </h3>
      <p>• genres : ${movie.genres}</p>
      <span>• Type : ${movie.type || ''}</span>
      <p>• contrie : ${movie.productionCountries} </p>
      <p ">• ${movie.releaseYear || ''}</p> 
      
    </div>

        `;
        modal.classList.remove('hidden');
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.onclick = () => modal.classList.add('hidden');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    };
  }
}
