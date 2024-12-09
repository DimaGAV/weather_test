import { useState } from "react";
import { getWeather, getForecast } from "./api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");

    if (!city.trim()) {
      setError("Пожалуйста, введите название города.");
      setWeatherData(null);
      setForecastData(null);
      return;
    }

    try {
      const weatherResponse = await getWeather(city.trim());

      if (weatherResponse.error) {
        setError(weatherResponse.error);
        setWeatherData(null);
        setForecastData(null);
        return;
      }

      setWeatherData(weatherResponse.data);

            const forecastResponse = await getForecast(city.trim());

      if (forecastResponse.error) {
        setError(forecastResponse.error);
        setForecastData(null);
        return;
      }

      setForecastData(forecastResponse.data);

    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      setError("Не удалось получить данные о погоде. Попробуйте позже.");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  return (
    <div className="weather-app">
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData && <ForecastList forecastData={forecastData} />}
    </div>
  );
};

export default App;
