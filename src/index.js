const unitSelect = document.querySelector("select");
const form = document.querySelector("form");
const searchbar = document.querySelector("input[type='search']");

async function getWeather(location) {
  try {
    let response = await fetch(
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

function getUnit() {
  return unitSelect.value === "F" ? "us" : "metric";
}

function getSearch() {
  if (!searchbar.value) return "London";
  return searchbar.value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(getWeather(getSearch()));
});
