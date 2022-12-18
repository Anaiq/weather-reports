// wave 1
'use strict';
// wave 2
const state = {
  city: 'Austin',
  lat: 0.0,
  lon: 0.0,
  temperature: 76,
};

const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const tempNumber = document.getElementById('temp-number');
tempNumber.textContent = `${state.temperature} °f`;

const garden = document.getElementById('garden');

const changeTempColor = () => {
  console.log('everything');
  const temp = state.temperature;
  console.log(temp);
  if (temp > 80) {
    tempNumber.style.color = 'red';
  } else if (temp > 70) {
    tempNumber.style.color = 'orange';
  } else if (temp > 60) {
    tempNumber.style.color = 'yellow';
  } else if (temp > 50) {
    tempNumber.style.color = 'green';
  } else {
    tempNumber.style.color = 'teal';
  }
};

const changeGarden = () => {
  console.log('something');
  const temp = state.temperature;
  console.log(temp);
  if (temp >= 80) {
    garden.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    garden.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    garden.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp > 50) {
    garden.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    garden.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const incTempNumber = () => {
  console.log('anything');
  state.temperature += 1;
  tempNumber.textContent = `${state.temperature} °f`;
  changeTempColor();
  changeGarden();
};
const incTheTemp = document.getElementById('inc-temp');
incTheTemp.addEventListener('click', incTempNumber);

const decTempNumber = function () {
  console.log('anything2');
  state.temperature -= 1;
  tempNumber.textContent = `${state.temperature} °f`;
  changeTempColor();
  changeGarden();
};

const decTheTemp = document.querySelector('#dec-temp');
decTheTemp.addEventListener('click', decTempNumber);

const headerCityName = document.getElementById('header-city-name');

const changeCity = () => {
  const formCity = document.getElementById('city-name').value;
  state.city = formCity;
  headerCityName.textContent = `${state.city}`;
};

const newCity = document.querySelector('#city-name');
newCity.addEventListener('change', changeCity);

const resetCityName = () => {
  const cityReset = document.getElementById('city-name');
  cityReset.value = 'Austin';
  changeCity();
};

const resetCityButton = document.getElementById('city-reset');
resetCityButton.addEventListener('click', resetCityName);

const changeSkyscape = () => {
  const skySelected = document.getElementById('sky-select').value;
  const skyscape = document.getElementById('skyscape');
  console.log('enter skyscape function');
  if (skySelected === 'sunny') {
    console.log('selected sunny');
    skyscape.textContent = '🌤🌤 🌤 🌤🌤 🌤 🌤 🌤 🌤🌤';
  } else if (skySelected === 'cloudy') {
    console.log('selected cloudy');
    skyscape.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skySelected === 'rainy') {
    console.log('selected rainy');
    skyscape.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skySelected === 'snowy') {
    console.log('selected snowy');
    skyscape.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const newSky = document.getElementById('sky-select');
newSky.addEventListener('change', changeSkyscape);

// const registerEventHandlers = () => {
// changeSkyscape();
// const newSky = document.getElementById('sky-select');
// newSky.addEventListener('change', changeSkyscape);
// };

// document.addEventListener('DOMContentLoaded', registerEventHandlers);

const findLatitudeAndLongitude = () => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: document.getElementById('city-name').value,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      console.log('Success in findLatitudeAndLongitude!', response.status);
      console.log(response.data);
      console.log('latitude:', state.lat);
      console.log('longitude:', state.lon);
      console.log('city:', state.city);
      console.log('temp:', state.temperature);

      console.log('findWeather', findWeather(state.lat, state.lon));
    })
    .catch((error) => {
      console.log(
        'Error in findLatitudeAndLongitude!',
        error.response.status,
        error.response.data
      );
    });
};

const findWeather = () => {
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
        units: 'imperial', //optional param to have temp returned in fahrenheit
      },
    })
    .then((response) => {
      const temp = response.data.main.temp;
      console.log('temp:', temp);
      const realTimeTemp = document.getElementById('temp-number');
      state.temperature = Math.round(convertKtoF(temp));
      console.log('temp:', temp);
      realTimeTemp.textContent = `${state.temperature} °f`;
      console.log('real time temp:', state.temperature);
      console.log(
        'Success in findWeather!',
        response.status,
        state.temperature
      );
      changeGarden();
    })
    .catch((error) => {
      console.log('Error in findWeather!');
    });
};

const newRealTempBtn = document.getElementById('real-time');
newRealTempBtn.addEventListener('click', findLatitudeAndLongitude);
