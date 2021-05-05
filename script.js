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
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, pressure, humidity} = data.main;
        const {speed} = data.wind;
        const {sunrise, sunset} = data.sys;
        const {dt} = data;
        console.log(name, icon, description, temp, pressure, humidity, speed, sunrise, sunset, dt);
        //Display information on the page
        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temperature").innerHTML = `${temp}°C`;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".wind").innerHTML = `Wind: ${speed} m/s`;
        document.querySelector(".pressure").innerHTML = `Pressure: ${pressure} hPa`;
        document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
        document.querySelector(".sunrise").innerHTML = `Sunrise: ${this.convertTime(sunrise)}`;
        document.querySelector(".sunset").innerHTML = `Sunrset: ${this.convertTime(sunrise)}`;
        document.querySelector(".last-update").innerHTML = `Last update: ${this.convertTime(dt)}`;
    },

    convertTime: function(unix) {
        var date = new Date(unix * 1000);
        var hour = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hour + ':' + minutes.substr(-2);
        return formattedTime;
    },

    search: function(city) {
        console.log(city);
        this.fetchWeather(city);
    }
};

function getCityValue() {
    var city = document.getElementById("cities").value;
    weather.fetchWeather(city);
}



