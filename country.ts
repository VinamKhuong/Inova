// ALl countries on init
var allCountries = [];
// countries displayed
var countries = [];

/**
 * Get all the countries
 */
async function getAllCoutries() {
  await fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((response) => (allCountries = response))
    .catch((error) => alert("Erreur : " + error));
}

/**
 * Create a card of a country
 * @param card
 */
function createCountryCard(card, index) {
  var sectionCard = document.getElementById("list-countries");
  var newCard = document.createElement("div");
  newCard.setAttribute("id", "country-card" + index);
  newCard.setAttribute("class", "card country-card");
  newCard.setAttribute("onClick", "getCountryDetails(" + index + ")");
  var newCardBody = document.createElement("div");
  newCardBody.setAttribute("class", "card-body");
  var newCode = document.createElement("p");
  newCode.innerText = card.alpha3Code;
  var newName = document.createElement("h5");
  newName.innerText = card.name;
  newCardBody.append(newCode);
  newCardBody.append(newName);
  newCard.append(newCardBody);
  sectionCard?.append(newCard);
}

function updateDetailInformation(country) {
  // Modify information of details
  for (
    var i = 0;
    i < document.getElementsByClassName("detail-flag").length;
    i++
  ) {
    document
      .getElementsByClassName("detail-flag")
      [i]?.setAttribute("src", country.flag);
    document.getElementsByClassName("detail-native-name")[i].innerHTML =
      country.nativeName;
    document.getElementsByClassName("detail-capital")[i].innerHTML =
      country.capital;
    document.getElementsByClassName("detail-population")[i].innerHTML =
      country.population;
    document.getElementsByClassName("detail-languages")[
      i
    ].innerHTML = country.languages.map((language) => language.name);
    document.getElementsByClassName("detail-time-zone")[
      i
    ].innerHTML = country.timezones.map((timezone) => timezone);
    document.getElementsByClassName("detail-currencies")[
      i
    ].innerHTML = country.currencies.map((currency) => currency.name);
    document.getElementsByClassName("detail-border-countries")[
      i
    ].innerHTML = country.borders.map((border) => border);
  }
}

/**
 * Get the details of one country
 * @param index index of the country in the list "countries"
 */
function getCountryDetails(index) {
  let country = countries[index];
  console.log(country);
  let countryDetails = document.getElementById("detail-country");
  let countryElement = document.getElementById("country-card" + index);
  // Change the background of the selecting country
  document
    .getElementsByClassName("country-active")[0]
    ?.classList.remove("country-active");
  countryElement?.classList.add("country-active");

  // Create the block of details
  document.getElementById("detail-country")?.classList.remove("hide");

  // display for mobile
  document.getElementById("detail-country-mobile")?.remove();
  var copyDetailMobile = document
    .getElementById("detail-country")
    ?.cloneNode(true);
  copyDetailMobile.setAttribute("id", "detail-country-mobile");
  console.log(copyDetailMobile.innerText);
  countryElement?.append(copyDetailMobile);

  updateDetailInformation(country);
}

/**
 * Create the list of the countries cards
 */
function createListCountries() {
  var sectionCard = document.getElementById("list-countries");
  sectionCard.innerText = "";
  for (let index in countries) {
    createCountryCard(countries[index], index);
  }
}

/**
 * Search countries in the search bar
 */
function filterCountries() {
  let nameSearched = document.getElementById("searchCountry").value;
  console.log(nameSearched);
  countries = allCountries.filter(function (country) {
    return !country.name.toLowerCase().indexOf(nameSearched.toLowerCase());
  });
  console.log(countries);
  createListCountries();
  document.getElementById("detail-country")?.classList.add("hide");
}

/**
 * Get all countries on init
 */
async function init() {
  await getAllCoutries();
  countries = allCountries;
  createListCountries();
}

init();
