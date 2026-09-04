const unitSelect = document.querySelector("select");
const form = document.querySelector("form");
const searchbar = document.querySelector("input[type='search']");
const contentDiv = document.querySelector(".content");

const giphyKey = 'dSQ5JGT1YBzHMzG4YwAaMcbxoJzuJrWR';

async function getWeatherJSON(location) {
  try {
    let response;
    response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${getUnit()}&key=3HJWGLW2FR7VJGCGAQPTM98S4&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    let json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherGif(conditions) {
  let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${conditions} weather&rating=g`);
  let json = await response.json();
  return json.data.images.original.url;
}

function display(data) {
  contentDiv.textContent = "";
  const feelslikeDiv = document.createElement("div");
  const tempDiv = document.createElement("div");
  const conditionsDiv = document.createElement("div");
  const weatherGif = document.createElement("img");

  feelslikeDiv.textContent = "Feels Like: " + data.feelslike;
  tempDiv.textContent = "Temp: " + data.temp;
  conditionsDiv.textContent = "Conditions: " + data.conditions;

  getWeatherGif(data.conditions).then((url) => weatherGif.src = url);

  contentDiv.append(feelslikeDiv, tempDiv, conditionsDiv, weatherGif);
}

function getData(json) {
  let currentConditions = json.currentConditions;
  let conditions = currentConditions.conditions;
  let feelslike = currentConditions.feelslike;
  let temp = currentConditions.temp;

  return { conditions, feelslike, temp };
}

function getUnit() {
  return unitSelect.value === "f" ? "us" : "metric";
}

function getSearch() {
  if (!searchbar.value) return "London";
  return searchbar.value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherJSON(getSearch()).then((json) => display(getData(json)));
});
