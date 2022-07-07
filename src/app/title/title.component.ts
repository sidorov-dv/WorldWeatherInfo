import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCityWeatherService } from '../get-city-weather.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  countriesList: string[] = [];
  selectedCountry: string = '';

  constructor(private http: HttpClient, public getCityWeatherService: GetCityWeatherService) { }

  ngOnInit(): void {
    const endPointCities = '/v2/countries';
    const url = `${this.getCityWeatherService.domain}${endPointCities}?${this.getCityWeatherService.APIKey}`;
    // fetch(url)
    //   .then(response => response.json())
    //   .then((res: any) => {
    //     this.countriesList = res.data.map((item: any) => item.country);
    //     console.log(this.countriesList)
    //   })
    //   .catch((e: any) => console.error(e))

    this.http.get(url).subscribe((res: any) => {
      this.countriesList = res.data.map((item: any) => item.country);
      console.log(this.countriesList)
    });
  }
}
