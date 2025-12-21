import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherModal } from '../modal/weather-modal';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  constructor(private _httpClient: HttpClient) {}

  public getWeather(city: string): Observable<WeatherModal> {
    return this._httpClient.get<WeatherModal>(
      `https://weather-app-backend-peach.vercel.app/api/weather?q=${city}`
    );
  }
}
