const apiKey = "a9c80a6af0ca9f5d3252a791bc88900e"; // 🔁 Replace this with your real API key

document.getElementById("getBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // debug output
      if (data.cod === 200) {
        const weatherHTML = `
          <p><strong>${data.name}, ${data.sys.country}</strong></p>
          <p>🌡️ Temperature: ${data.main.temp}°C</p>
          <p>☁️ Weather: ${data.weather[0].main}</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherInfo").innerHTML = weatherHTML;
      } else {
        document.getElementById("weatherInfo").innerHTML = `<p>❌ ${data.message}</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherInfo").innerHTML = `<p>⚠️ Could not fetch weather data</p>`;
    });
}
