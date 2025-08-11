import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { key } from '../../env/key';
import { Observable } from 'rxjs';
import { WeatherModal } from '../modal/weather-modal';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  constructor(private _httpClient: HttpClient) {}

  public getWeather(city: string): Observable<WeatherModal> {
    return this._httpClient.get<WeatherModal>(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`
    );
  }
}
