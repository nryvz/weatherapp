const apiKey = 'ffa551a0931351d235ce9835633c3681';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

document.getElementById('fetch-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('weather-result');
    forecastContainer.innerHTML = '';

    // Her gün için bir hava durumu kartı gösterelim (8 tane üç saatlik tahmin = yaklaşık 1 gün)
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        forecastCard.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="${description}">
            <p>Temp: ${temp}°C</p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    }
}
