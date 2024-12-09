import PropTypes from "prop-types";

const ForecastList = ({ forecastData }) => {
  if (!forecastData) return null;

  const getDateWithoutTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const uniqueDaysForecast = forecastData.list.reduce((acc, forecast) => {
    const forecastDate = getDateWithoutTime(forecast.dt);

    if (!acc.some((item) => getDateWithoutTime(item.dt) === forecastDate)) {
      acc.push(forecast);
    }

    return acc;
  }, []);

  return (
    <div className="forecast-list">
      <h3>Прогноз на 5 дней</h3>
      <div className="forecast-items">
        {uniqueDaysForecast.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{getDateWithoutTime(forecast.dt)}</p>
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
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ForecastList;
