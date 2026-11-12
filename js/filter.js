export function searchMatch(movies , searchInput)
{
    return movies.filter(movie => movie.title.toLowerCase().trim().includes(searchInput.toLowerCase().trim()));
}
