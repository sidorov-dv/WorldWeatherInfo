import { Component, OnInit } from '@angular/core';
import { GetCityWeatherService } from '../get-city-weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {

  citiesList: string[] = [];
  selectedCity: string = '';
  currentState: string = '';
  currentCountry: string = '';

  constructor(public getCityWeatherService: GetCityWeatherService) { }

  ngOnInit(): void {
    this.currentCountry = this.getCityWeatherService.sendCountry()!;
    this.currentState = this.getCityWeatherService.sendState()!;
    this.getCityWeatherService.getCities();
    this.getCityWeatherService.subCity.subscribe((res: any) => this.citiesList = res);
  }
}
