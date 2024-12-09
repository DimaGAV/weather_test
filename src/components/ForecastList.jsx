import PropTypes from "prop-types";

const ForecastList = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <div className="forecast-list">
      <h3>Прогноз на 5 дней</h3>
      <div className="forecast-items">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p>Температура: {Math.round(forecast.main.temp)}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ForecastList.propTypes = {
  forecastData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired, // Время прогноза (в секундах)
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired, // Температура
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired, // Иконка погоды
            description: PropTypes.string.isRequired, // Описание погоды
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ForecastList;
