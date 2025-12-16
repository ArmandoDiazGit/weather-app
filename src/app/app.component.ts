import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherServiceService } from './services/weather-service.service';
import { WeatherModal } from './modal/weather-modal';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit, OnDestroy {

  public weatherForm = new FormGroup({
    zipCode: new FormControl('', [Validators.required]),
  });
  public weather?: WeatherModal;
  public showData: boolean = false;
  public isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _weatherApi: WeatherServiceService
  ) {}

    get zipCodeForm() {
    return this.weatherForm.get('zipCode');
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitForm(): void {
    this.isLoading = true;
    this._weatherApi
      .getWeather(this.weatherForm.value.zipCode!)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: WeatherModal) => {
        this.isLoading = false;
        this.showData = true;
        this.weather = res;
      });
  }
}
