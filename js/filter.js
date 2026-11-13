export function searchMatch(movies , searchInput)
{
    return movies.filter(movie => movie.title.toLowerCase().trim().includes(searchInput.toLowerCase().trim()));
}
export function FilterMatch(movies , filterType)
{
    if(filterType == "all")
        return movies;
    return movies.filter(movie => movie.type.toLowerCase().trim().includes(filterType.toLowerCase().trim()))
}