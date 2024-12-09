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
    setError(""); // Очищаем предыдущее сообщение об ошибке

    if (!city.trim()) {
      setError("Пожалуйста, введите название города.");
      setWeatherData(null);
      setForecastData(null);
      return;
    }

    try {
      // Получаем данные о текущей погоде
      const weatherResponse = await getWeather(city.trim());

      if (weatherResponse.error) {
        setError(weatherResponse.error); // Если ошибка с данными, выводим сообщение об ошибке
        setWeatherData(null);
        setForecastData(null);
        return;
      }

      setWeatherData(weatherResponse.data);

      // Получаем прогноз погоды на 5 дней
      const forecastResponse = await getForecast(city.trim());

      if (forecastResponse.error) {
        setError(forecastResponse.error); // Если ошибка с прогнозом, выводим сообщение об ошибке
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
      {/* Показываем карточку с погодой только если данные о погоде есть */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {/* Показываем прогноз на 5 дней только если данные о прогнозе есть */}
      {forecastData && <ForecastList forecastData={forecastData} />}
    </div>
  );
};

export default App;
