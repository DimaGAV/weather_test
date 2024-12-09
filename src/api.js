import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "ru", // Можно добавить поддержку языка
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Ошибка получения данных о погоде" };
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "ru",
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Ошибка получения прогноза погоды" };
  }
};
