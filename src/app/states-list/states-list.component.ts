import { Component, OnInit } from '@angular/core';
import { GetCityWeatherService } from '../get-city-weather.service';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements OnInit {

  statesList: string[] = [];
  selectedState: string = '';
  currentCountry: string = '';

  constructor(public getCityWeatherService: GetCityWeatherService) { }

  ngOnInit(): void {
    this.currentCountry = this.getCityWeatherService.sendCountry()!;
    this.getCityWeatherService.getStates();
    this.getCityWeatherService.subState.subscribe((res: any) => this.statesList = res);   
  }
}

