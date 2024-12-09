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
    const { data, error } = await getWeather(city);
    if (error) {
      setError(error);
      setWeatherData(null);
      setForecastData(null);
      return;
    }
    setWeatherData(data);

    const { data: forecast, error: forecastError } = await getForecast(city);
    if (forecastError) {
      setError(forecastError);
      setForecastData(null);
      return;
    }
    setForecastData(forecast);
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
