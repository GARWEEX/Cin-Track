export function getFavorites() {
    let data = localStorage.getItem("favorites");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

export function saveFavorites(list) {
    localStorage.setItem("favorites", JSON.stringify(list));
}