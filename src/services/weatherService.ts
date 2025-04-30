import axios from 'axios';
import { WeatherData } from '@/types/outfit';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// Helper to determine season based on month and hemisphere
function getSeason(date: Date, lat: number): string {
  const month = date.getMonth();
  // Northern Hemisphere
  if (lat >= 0) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  } else {
    // Southern Hemisphere (opposite)
    if (month >= 2 && month <= 4) return 'fall';
    if (month >= 5 && month <= 7) return 'winter';
    if (month >= 8 && month <= 10) return 'spring';
    return 'summer';
  }
}

// Helper to determine time of day
function getTimeOfDay(date: Date, sunrise: number, sunset: number): string {
  const hour = date.getHours();
  if (hour < 5) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 20) return 'evening';
  return 'night';
}

// Fetch real-time weather for a city or coordinates
export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  const data = response.data;
  const now = new Date((data.dt + data.timezone) * 1000);
  const sunrise = new Date(data.sys.sunrise * 1000).getHours();
  const sunset = new Date(data.sys.sunset * 1000).getHours();
  return {
    date: now,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
    season: getSeason(now, lat),
    timeOfDay: getTimeOfDay(now, sunrise, sunset),
  } as WeatherData;
}

// Fetch 5-day weather forecast for a city or coordinates
interface Forecast {
  date: Date;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  season: string;
  timeOfDay: string;
}

export async function getWeatherForecast(lat: number, lon: number): Promise<Forecast[]> {
  const url = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  const data = response.data.list;
  const forecast: Forecast[] = [];
  for (let i = 0; i < data.length; i += 8) {
    const date = new Date(data[i].dt * 1000);
    forecast.push({
      date: date,
      temperature: data[i].main.temp,
      description: data[i].weather[0].description,
      humidity: data[i].main.humidity,
      windSpeed: data[i].wind.speed,
      icon: data[i].weather[0].icon,
      season: getSeason(date, lat),
      timeOfDay: getTimeOfDay(date, 6, 18), 
    });
  }
  return forecast;
}

export function getOutfitRecommendation(weather: WeatherData): string {
  if (weather.temperature < 10) {
    return 'Wear warm, layered clothing to stay comfortable in cold weather.';
  } else if (weather.temperature < 20) {
    return 'Light, breathable clothing is recommended.';
  } else {
    return 'Light, breathable clothing is recommended.';
  }
}

export type { WeatherData } from '@/types/outfit';