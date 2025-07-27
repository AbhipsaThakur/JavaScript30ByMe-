
        const apiKey = "3e2723b1bb6ca8dba08a1b4ccaa2a401";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
    
        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) throw new Error("City not found");
                const data = await response.json();
    
                document.querySelector(".city").textContent = data.name;
                document.querySelector(".temp").textContent = Math.round(data.main.temp) + "℃";
                document.querySelector(".humidity").textContent = data.main.humidity + "%";
                document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    
                // Dynamic weather icon
                const weatherIcon = document.querySelector(".weather-icon");
                const mainWeather = data.weather[0].main.toLowerCase();
                const knownIcons = ["clouds", "clear", "rain", "drizzle", "mist", "snow"];
                weatherIcon.src = knownIcons.includes(mainWeather) ? `img/${mainWeather}.png` : "img/default.png";
    
            } catch (error) {
                alert("City not found! Please try again.");
            }
        }
    
        // Click on search button
        searchBtn.addEventListener("click", () => {
            const city = searchBox.value.trim();
            if (city) checkWeather(city);
        });
    
        // Press Enter key to trigger search
        searchBox.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const city = searchBox.value.trim();
                if (city) checkWeather(city);
            }
        });
    
        // Optional: Load default weather
        checkWeather("New York");
    