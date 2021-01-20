export function getAllCoutries() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((response) => alert(JSON.stringify(response)))
    .catch((error) => alert("Erreur : " + error));
}
