const apiKey 
    = 'd5403d87529f0bc0ff29a4aa33054982';
const apiUrl 
    = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city)
{
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if(response.status == 400)
    {
        document.querySelector('.error-message').style.display = 'flex';
        document.querySelector('.weather').style.display = 'none';
        return;
    }
    else if(response.status == 404)
    {
        document.querySelector('.error-message').innerHTML = 'Error 404, page not found.'
        document.querySelector('.error-message').style.display = 'flex';
        document.querySelector('.weather').style.display = 'none';
    }
    else
    {
        document.querySelector('.error-message').style.display = "none";
    }

    var weatherData = await response.json();

    cityName = weatherData.name;
    temperature = weatherData.main.temp;
    humidity = weatherData.main.humidity;
    windSpeed = weatherData.wind.speed;
    weather = weatherData.weather[0].main;

    document.querySelector('.city').innerHTML
        = cityName;
    document.querySelector('.temperature').innerHTML
        = Math.round(temperature) + '℃';
    document.querySelector('.humidity').innerHTML
        = humidity + '%';
    document.querySelector('.wind').innerHTML
        = windSpeed + ' km/h';

    if(weather === 'Clear')
        weatherIcon.src = 'images/clear.png'
    else if(weather === 'Clouds')
        weatherIcon.src = 'images/clouds.png'
    else if(weather === 'Drizzle')
        weatherIcon.src = 'images/drizzle.png'
    else if(weather === 'Mist')
        weatherIcon.src = 'images/mist.png'
    else if(weather === 'Rain')
        weatherIcon.src = 'images/rain.png'
    else if(weather === 'Snow')
        weatherIcon.src = 'images/snow.png'

    document.querySelector('.weather').style.display = 'block';
}

searchButton.addEventListener('click', ()=>
{
    checkWeather(searchBox.value);
})