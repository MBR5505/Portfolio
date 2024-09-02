const clouds = document.querySelectorAll(".cloud");

const cloudTextCity = document.querySelector(".cloudTextCity");
const cloudTextWeather = document.querySelector(".cloudTextWeather");
const cloudTextDegree = document.querySelector(".cloudTextDegree");

let cityT = document.querySelector(".city").textContent;
const weather = document.querySelector(".weather");
const degree = document.querySelector(".degree");

const byInput = document.getElementById("by");

const kaboom = document.querySelector(".sun");

const key = "DS8W8aqaSSl6gQqbhPumijvlj9MKW8fA";

const sun = document.querySelector(".actualSun");

const bgMusic = document.getElementById("bg-music");
const rainMusic = document.getElementById("rain");

// Functions:
const getConditions = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  if (data[0].IsDayTime === true) {
    kaboom.style.backgroundColor = "#2289e4";
    bgMusic.innerHTML =
      '<source src="/Weather/musikk/birds.mp3" type="audio/mpeg">';

    bgMusic.pause(); // Pause current audio if playing
    bgMusic.load(); // Load new audio
    bgMusic.play(); // Play new audio
  } else {
    kaboom.style.backgroundColor = "#05233e";
    bgMusic.innerHTML =
      '<source src="/Weather/musikk/night.mp3" type="audio/mpeg">';

    bgMusic.pause(); // Pause current audio if playing
    bgMusic.load(); // Load new audio
    bgMusic.play(); // Play new audio
  }

  if(data[0].PrecipitationType === "Rain" || data[0].PrecipitationType === "Heavy Rain" || data[0].PrecipitationType === "Drizzle" || data[0].PrecipitationType === "Light Rain" || data[0].PrecipitationType === "Snow") {
    rainMusic.innerHTML = '<source src="./musikk/rain-and-thunder-nature-sounds-7803.mp3" type="audio/mpeg">';

    cloudElement.classList.add('custom-background');

    weather.style.color = 'gray';
    
  }

  cloudTextWeather.innerHTML = data[0].WeatherText;

  return data[0];
};


// const getForecast = async (id) => {
//   const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
//   const query = `${id}?apikey=${key}&metric=true`;

//   const response = await fetch(base + query);
//   const data = await response.json();

//   console.log(data);
// }



const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

byInput.addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
    const city = byInput.value;

    cityT = city; // Change this line
    cloudTextCity.innerHTML = city;



    if (city !== "") {


      const cityDetails = await getCity(city);
      console.log("CityDetails:", cityDetails);

      // byInput.placeholder = `${byInput.value}`;

      try {
        const data = await getConditions(cityDetails.Key);
        console.log(data);
        byInput.value = "";

        if (data) {
          // Display the weather text
          if (data.WeatherText) {
            weather.innerHTML = data.WeatherText;
          } else {
            weather.innerHTML = "Weather information not available";
          }

          // Display the temperature
          if (data.Temperature && data.Temperature.Metric) {
            degree.innerHTML = data.Temperature.Metric.Value + "°C";
            cloudTextDegree.innerHTML = data.Temperature.Metric.Value + "°C";
          } else {
            degree.innerHTML = "Temperature information not available";
            cloudTextDegree.innerHTML = "Temperature information not available";
          }

          if (
            data.WeatherText === "Sunny" ||
            data.WeatherText === "Mostly sunny" ||
            data.WeatherText === "Partly sunny"
          ) {
            sun.style.opacity = "1";
            sun.style.padding = `${data.Temperature.Metric.Value}px`;

            weather.style.color = 'yellow';

            // if (data.Temperature.Metric.Value > 10) {
            //   sun.innerHTML = "🌞";
            // } else {
            //   sun.innerHTML = "😞";
            // }
          } else {
            sun.style.opacity = "0";
          }

          // Check if the clouds element exists before setting its display property
          const clouds = document.querySelector(".cloud");
          if (clouds) {
            if (
              data.WeatherText === "Cloudy" ||
              data.WeatherText === "Mostly Cloudy" ||
              data.WeatherText === "Partly Cloudy"
            ) {
              clouds.style.display = "block";
            } else {
              clouds.style.display = "none";
            }
          } else {
            console.error("Clouds element not found");
          }
        } else {
          // Handle the case when data is not available
          weather.innerHTML = "Weather information not available";
          degree.innerHTML = "Temperature information not available";
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
});
