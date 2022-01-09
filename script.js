let api = '6651e90c2f30e711da83093e0d4f6569';
// let city = document.getElementById('cityName').defaultValue;
// city.setAttribute('value', 'Japan');
// console.log('city::', city);
async function fetchWeatherByCity(city) {
  let result = {};
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
  )
    .then((data) => data.json())
    .then((weatherInfo) => Object.assign(result, weatherInfo));
  console.log(result.main);
  return result.main;
}
// const btn = document.querySelector('button');
// console.log('btn', btn);
// btn.addEventListener('onclick', fetchWeatherByCity(city));
// fetchWeatherByCity('Austin');

const cacheTime = 10000;
const cache = {};
let cacheTimer = 0;

const getCacheTimer = (time) => {
  const now = new Date().getTime();
  if (cacheTimer < now + time) {
    cacheTimer = now + time;
  }
  return cacheTimer;
};

const fetchFromCache = async (city, time) => {
  const now = new Date().getTime();
  if (!cache[city] || cache[city].cacheTimer < now) {
    cache[city] = await fetchWeatherByCity(city);
    cache[city].cacheTimer = getCacheTimer(time);
  }
  return cache[city];
};

console.log('Cache', cache);

// fetchFromCache('Austin',cacheTime)
// fetchFromCache('London',cacheTime)
// fetchFromCache('Austin',cacheTime)
