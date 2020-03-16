// Foursquare API Info
const clientId = 'INSERT';
const clientSecret = 'INSERT';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'INSERT';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = url + city + '&limit=3&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20191119';
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      jsonResponse = await response.json();
      let venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${weatherUrl}?&q=${city}&APPID=${openWeatherKey}`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  }
}

// Add photo to every attraction
const addPhoto = async (venues) => {
  const urlPrefix = 'https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/venues/';
  const urlSuffix = '/photos?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20191120';
  for (let i=0; i < venues.length; i++) {
    try {
        const response = await fetch(urlPrefix + venues[i].id + urlSuffix);
        if (response.ok) {
          const jsonResponse = await response.json();
          const photoObj = jsonResponse.response.photos.items[0];
          const photoUrl = photoObj.prefix + 'original' + photoObj.suffix;
          venues[i]["photo"] = photoUrl;
          console.log(venues[i]);
        }
      } catch (error) {
        console.log(error);
      }
  }
  console.log(venues);
  return venues;
}

// Render functions
const renderVenues = (venues) => {
  console.log(venues);
  let venuesContentArray = $venueDivs.map(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    console.log(Object.keys(venue));
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    const venuePhoto = venue.photo;
    console.log(venuePhoto);
    let venueContent = createVenueHTML(venue.name, venue.location, venuePhoto);
    return venueContent;
  });

  console.log(venuesContentArray);

  shuffle(venuesContentArray);

  $venueDivs.forEach(($venue, index) => {
    $venue.append(venuesContentArray[index]);
  });

  console.log(venuesContentArray);

  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

// Function to shuffle the top 3 attractions
const shuffle = array => {
  array.sort(() => Math.random() -0.5);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("display", "block");
  $container.css("visibility", "visible");
  getVenues().then(venues => addPhoto(venues)).then(venues => renderVenues(venues));
  getForecast().then(weather => renderForecast(weather));
  return false;
}

$submit.click(executeSearch)