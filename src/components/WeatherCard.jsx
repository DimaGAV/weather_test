import PropTypes from "prop-types";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <h2>{weatherData.name}</h2>
      <p>Температура: {Math.round(weatherData.main.temp)}°C</p>
      <p>Влажность: {weatherData.main.humidity}%</p>
      <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].description}
      />
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default WeatherCard;
