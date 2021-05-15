
window.onload = function() {
    //Save favourite cities 
    let selectedCity = document.getElementById("cities");
    selectedCity.addEventListener("change", getCityValue);
    let saveButton = document.querySelector('#save-button');
    if (saveButton !== null) {
        saveButton.addEventListener('click', saveCity);
    }


    //Fetch weather API and display on the container
    let weather = {
        "apiKey": "3250c60a802925bac378d70fbe2e2e33",
        fetchWeather: function(city) {
            fetch(
                "http://api.openweathermap.org/data/2.5/weather?q=" 
                + city 
                + "&units=metric&appid=" 
                + this.apiKey
            ).then((response) => response.json()).then((data) => this.displayWeather(data));
        },

        displayWeather: function(data) {
            //Retrieve weather fields from API response
            const {name} = data;
            const {icon, description} = data.weather[0];
            const {temp, pressure, humidity} = data.main;
            const {speed} = data.wind;
            const {sunrise, sunset} = data.sys;
            const {dt} = data;
            console.log(name, icon, description, temp, pressure, humidity, speed, sunrise, sunset, dt);

            //Display information on the page
            document.querySelector(".city").innerHTML = `${name}`;
            document.querySelector(".temperature").innerHTML = `${temp}°C`;
            document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".wind").innerHTML = `Wind: ${speed} m/s`;
            document.querySelector(".pressure").innerHTML = `Pressure: ${pressure} hPa`;
            document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
            document.querySelector(".sunrise").innerHTML = `Sunrise: ${this.convertTime(sunrise)}`;
            document.querySelector(".sunset").innerHTML = `Sunset: ${this.convertTime(sunrise)}`;
            document.querySelector(".last-update").innerHTML = `Last update: ${this.convertTime(dt)}`;
        },

        //Convert unix timestamps to real time
        convertTime: function(unix) {
            var date = new Date(unix * 1000);
            var hour = date.getHours();
            var minutes = "0" + date.getMinutes();
            var formattedTime = hour + ':' + minutes.substr(-2);
            return formattedTime;
        },

    };

    function getCityValue() {
        let city = selectedCity.value;
        weather.fetchWeather(city);
    }

    let counter = 0;

    //Save favourite city
    function saveCity(e) {
        e.preventDefault();
        
        if(counter < 3) {
            const flexBox = document.querySelector(".flex-box");

            //Create container div
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('container');

            //Create weather div
            const weatherDiv = document.createElement('div');
            weatherDiv.classList.add('weather');

            //Create weather data
            const city = document.querySelector(".city");
            const cityData = document.createElement('h2');
            cityData.classList.add('city');
            cityData.innerHTML = city.innerHTML;

            //Create temperature data
            const temperature = document.querySelector(".temperature");
            const temperatureData = document.createElement('h1');
            temperatureData.classList.add('temperature');
            temperatureData.innerHTML = temperature.innerHTML;

            //Flex div to display description and icon horizontally
            const flexDiv = document.createElement('div');
            flexDiv.classList.add('flex');

            //Create description data
            const description = document.querySelector(".description");
            const descriptionData = document.createElement('div');
            descriptionData.classList.add('description');
            descriptionData.innerHTML = description.innerHTML;


            //Create icon data
            const icon = document.querySelector(".icon");
            const iconData = document.createElement('img');
            iconData.classList.add('icon');
            iconData.src = icon.src;

            flexDiv.appendChild(descriptionData);
            flexDiv.appendChild(iconData);

            //Create wind data
            const wind = document.querySelector(".wind");
            const windData = document.createElement('div');
            windData.classList.add('wind');
            windData.innerHTML = wind.innerHTML;

            //Create presure data
            const pressure = document.querySelector(".pressure");
            const pressureData = document.createElement('div');
            pressureData.classList.add('pressure');
            pressureData.innerHTML = pressure.innerHTML;

            //Create humidity data
            const humidity = document.querySelector(".humidity");
            const humidityData = document.createElement('div');
            humidityData.classList.add('humidity');
            humidityData.innerHTML = humidity.innerHTML;

            //Create sunrise data
            const sunrise = document.querySelector(".sunrise");
            const sunriseData = document.createElement('div');
            sunriseData.classList.add('sunrise');
            sunriseData.innerHTML = sunrise.innerHTML;

            //Flex div to display 'UV index' and 'last updated' horizontally
            const anotherflexDiv = document.createElement('div');
            anotherflexDiv.classList.add('flex');

            //Create sunset data
            const sunset = document.querySelector(".sunset");
            const sunsetData = document.createElement('div');
            sunsetData.classList.add('sunset');
            sunsetData.innerHTML = sunset.innerHTML;

            //Create last update data
            const lastUpdate = document.querySelector(".last-update");
            const lastUpdateData = document.createElement('div');
            lastUpdateData.classList.add('last-update');
            lastUpdateData.innerHTML = lastUpdate.innerHTML;

            anotherflexDiv.appendChild(sunsetData);
            anotherflexDiv.appendChild(lastUpdateData);

            weatherDiv.appendChild(cityData);
            weatherDiv.appendChild(temperatureData);
            weatherDiv.appendChild(flexDiv);
            weatherDiv.appendChild(windData);
            weatherDiv.appendChild(pressureData);
            weatherDiv.appendChild(humidityData);
            weatherDiv.appendChild(sunriseData);
            weatherDiv.appendChild(anotherflexDiv);

            containerDiv.appendChild(weatherDiv);
            flexBox.appendChild(containerDiv);
            
            counter++;
        } else {
            const message = document.querySelector(".message");
            message.innerHTML = "You can only save 3 cities.";
        }
    }
}





