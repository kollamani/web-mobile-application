import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getWeather(city: string) {
    if (!city) return null;
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    if (!apiKey) return null;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
      );
      const { data } = response;
      return {
        temp: Math.round(data.main.temp),
        description: data.weather[0]?.description,
        icon: data.weather[0]?.icon,
        city: data.name,
      };
    } catch (error) {
      return null;
    }
  }
}