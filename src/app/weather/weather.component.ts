import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { WeatherService } from './weather.service';
import { MessageService } from '../message.service';
import { WeatherObject } from '../weatherObject';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  providers: [WeatherService],
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  editWeather: WeatherObject = {}; // the weather currently being edited
  lat: number = 0;
  lon: number = 0;
  localisation: string = '';
  pays: string = '';
  nuages: string = '';
  temperature: number = 0;
  temperature_ressentie: number = 0;
  humidite: number = 0;
  vent_vitesse: number = 0;
  vent_direction: string = '';
  public show = false;
  public meteo_message: string = 'Afficher la météo';

  constructor(private weatherService: WeatherService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getWeather(): void {
    this.getLocation();
    this.weatherService.getWeather(this.lat, this.lon)
      .subscribe(weather => (this.editWeather = weather));
    this.attributionWeather();
  }

  getWeatherAndShow(): void {
    if(this.localisation === '') {
      this.getWeather();
    }
    if(this.show) {
      this.meteo_message = 'Afficher la météo';
    } else {
      this.meteo_message = 'Cacher la météo';
    }
    this.show = !this.show;
  }

  attributionWeather(): void {
    if(this.editWeather && this.editWeather.name) {
      this.localisation = this.editWeather.name;
    }
    if(this.editWeather && this.editWeather.sys && this.editWeather.sys.country) {
      this.pays = this.editWeather.sys.country;
    }
    if(this.editWeather && this.editWeather.weather && this.editWeather.weather[0].description) {
      this.nuages = this.editWeather.weather[0].description;
    }
    if(this.editWeather && this.editWeather.main && this.editWeather.main.temp) {
      this.temperature = this.editWeather.main.temp;
    }
    if(this.editWeather && this.editWeather.main && this.editWeather.main.feels_like) {
      this.temperature_ressentie = this.editWeather.main.feels_like;
    }
    if(this.editWeather && this.editWeather.main && this.editWeather.main.humidity) {
      this.humidite = this.editWeather.main.humidity;
    }
    if(this.editWeather && this.editWeather.wind && this.editWeather.wind.speed) {
      this.vent_vitesse = Math.round((this.editWeather.wind.speed * 1.609344) * 10) / 10;
    }
    if(this.editWeather && this.editWeather.wind && this.editWeather.wind.deg) {
      if(this.editWeather.wind.deg > 315 && this.editWeather.wind.deg <= 45) {
        this.vent_direction = 'Nord';
      } else if(this.editWeather.wind.deg > 45 && this.editWeather.wind.deg <= 135) {
        this.vent_direction = 'Est';
      } else if(this.editWeather.wind.deg > 135 && this.editWeather.wind.deg <= 225) {
        this.vent_direction = 'Sud';
      } else if(this.editWeather.wind.deg > 225 && this.editWeather.wind.deg <= 315) {
        this.vent_direction = 'Ouest';
      } else {
        this.vent_direction = '';
      }
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        }
      },
        (error: GeolocationPositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
