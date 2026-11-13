const API_URL = 'https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json';

export async function fetchMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Erreur API");
  }
  const data = await res.json();
  return data;
}