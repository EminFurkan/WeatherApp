const searchBar = document.querySelector('input[name="search"]');
const searchBtn = document.querySelector('.btn');
const tempratureUnit = document.querySelector('.temprature-icon');

searchBar.addEventListener('keyup', e => {
    if (e.keyCode === 13){
        searchBtn.click();
    }
})

searchBtn.addEventListener('click', () => {
    const api_key = '6baa5ff690cfbd3cc2f5d4bb63ad2f11';     // INSERT YOUR API KEY HERE
    const loc = searchBar.value;
    if (loc === null) return;
    
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${api_key}`;
    fetch(url)
    .then(res => res.json())
    .then(data => setWeatherData(data))
    .catch(err => console.log(err));
});

const setWeatherData = (data) => {
    const resultArea = document.querySelector('.results');
    const weatherText = document.querySelector('.weather-text');
    const tagList = document.querySelector('.data-tags');
    const valueList = document.querySelector('.data-values');
    const temprature = document.querySelector('.temprature');

    let result = 'Math.round(value * (1.8) - 459.67)';
    let value = data.main.temp;
    temprature.textContent = eval(result);

    tempratureUnit.innerHTML = '<i class="far fa-circle"></i>F';

    if (tempratureUnit.classList.contains('celsius')){
        result = 'Math.round(value - 273.15)';
        temprature.textContent = eval(result);
        tempratureUnit.innerHTML = '<i class="far fa-circle"></i>C';
    }

    for (let i = 0; i < tagList.children.length; i++){
        value = Object.values(data.main)[i];
        i <= 3 ? valueList.children[i].textContent = eval(result) : valueList.children[i].textContent = Math.round(value);
    }

    const locationInfo = document.querySelector('.location-info');
    locationInfo.textContent = data.name;

    const icons = new Skycons({"color": "rgb(219, 186, 107)"});
    
    const icon_tags = {
        Clear: 'clear_day',
        Clouds: 'partly_cloudy_day',
        Drizzle: 'sleet',
        Rain: 'rain',
        Snow: 'snow',
        Mist: 'fog'
    }
    
    icons.set("icon", icon_tags[data.weather[0].main]);
    icons.play();
    resultArea.style.display = 'flex';
    weatherText.style.display = 'flex';
}

tempratureUnit.addEventListener('click',() => {
    tempratureUnit.classList.toggle('celsius');
    searchBtn.click();
    searchBar.focus();
});