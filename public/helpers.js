const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    console.log(currentDay)
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
          <h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
      <div id="temperatures">
          <h2 id="min-temp">Mínima: ${kelvinToCelsius(currentDay.main.temp_min)}&deg;C</h2>
          <h2 id="max-temp">Máxima: ${kelvinToCelsius(currentDay.main.temp_max)}&deg;C</h2>
      </div>
        <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
  }
  
  const kelvinToCelsius = k => (k - 273.15).toFixed(0);