import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { WeatherInfo } from "./weather";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetCityWeatherService {

  domain = 'https://api.airvisual.com';
  APIKey = 'key=bb192f9e-1b15-4123-ae2f-9ff7dcd1dca0';

  cityName: string | undefined;
  // firstCity: { city?: string } = {};
  newState: string | undefined;
  newCountry: string | undefined;
  statesList: string[] = [];
  citiesList: string[] = [];
  weatherTarget = {} as WeatherInfo;
  // weatherFirstCity = {} as WeatherInfo;
  subState = new Subject<string[]>();
  subCity = new Subject<string[]>();
  subWeather = new Subject<WeatherInfo>();
  // subWeatherFirst = new Subject<WeatherInfo>();

  constructor(private http: HttpClient) { }

  sendCountry() {
    return this.newCountry;
  }

  sendState() {
    return this.newState;
  }

  setSelectedCountry(country: string) {
    this.newCountry = country;
    console.log(this.newCountry);
  }

  setSelectedState(state: string) {
    this.newState = state;
    console.log(this.newState);
  }

  setSelectedCity(city: string) {
    this.cityName = city;
    console.log(this.cityName);
  }


  getStates() {
    console.log(this.newCountry);
    const endPointCities = `/v2/states?country=${this.newCountry}&${this.APIKey}`;
    const url = `${this.domain}${endPointCities}`;
    // fetch(url)
    // .then(response => response.json())
    // .then((res: any) => {
    //   this.statesList = res.data.map((item: any) => item.state);
    //   console.log(this.statesList);
    //   this.subState.next(this.statesList)
    // })
    // .catch((e: any) => console.error(e))

    this.http.get(url).subscribe((res: any) => {
      this.statesList = res.data.map((item: any) => item.state);
      console.log(this.statesList);
      this.subState.next(this.statesList)
    });
  }

  getCities() {
    console.log(this.newState);
    const endPointCities = `/v2/cities?state=${this.newState}&country=${this.newCountry}&${this.APIKey}`;
    const url = `${this.domain}${endPointCities}`;
    // fetch(url)
    // .then(response => response.json())
    // .then((res: any) => {
    //   this.citiesList = res.data.map((item: any) => item.city);
    //   console.log(this.citiesList);
    //   this.subCity.next(this.citiesList)
    // })
    // .catch((e: any) => console.error(e))

    this.http.get(url).subscribe((res: any) => {
      this.citiesList = res.data.map((item: any) => item.city);
      console.log(this.citiesList);
      this.subCity.next(this.citiesList)
    });
  }

  // getCitiesFirst() {
  //   const endPointCities = `/v2/cities?state=${this.newState}&country=${this.newCountry}&${this.APIKey}`;
  //   const url = `${this.domain}${endPointCities}`;
  //   this.http.get(url)
  //     .pipe(map((res: any) => this.firstCity = res.data.find((item: any) => item.length !== 0)),
  //           switchMap((value: any) =>
  //             this.http.get(`${this.domain}/v2/city?city=${this.firstCity.city}&state=${this.newState}&country=${this.newCountry}&${this.APIKey}`)
  //           ))
  //     .subscribe((res: any) => {
  //       this.weatherFirstCity.cityName = res.data.city;
  //       this.weatherFirstCity.temperature = res.data.current.weather.tp;
  //       this.weatherFirstCity.pressure = res.data.current.weather.pr;
  //       this.weatherFirstCity.humidity = res.data.current.weather.hu;
  //       console.log(this.weatherFirstCity);
  //       this.subWeatherFirst.next(this.weatherFirstCity)
  //     });
  // }

  showWeatherInfo() {
    console.log(this.cityName);
    const endPointChoiceCities = `/v2/city?city=${this.cityName}&state=${this.newState}&country=${this.newCountry}`;
    const url = `${this.domain}${endPointChoiceCities}&${this.APIKey}`;
    // fetch(url)
    // .then(response => response.json())
    // .then((response: any) => {
    //   this.weatherTarget.cityName = response.data.city;
    //   this.weatherTarget.temperature = response.data.current.weather.tp;
    //   this.weatherTarget.pressure = response.data.current.weather.pr;
    //   this.weatherTarget.humidity = response.data.current.weather.hu;
    //   console.log(this.weatherTarget);
    //   this.subWeather.next(this.weatherTarget);
    // })
    // .catch((e: any) => console.error(e))

    this.http.get(url).subscribe((response: any) => {
      this.weatherTarget.cityName = response.data.city;
      this.weatherTarget.temperature = response.data.current.weather.tp;
      this.weatherTarget.pressure = response.data.current.weather.pr;
      this.weatherTarget.humidity = response.data.current.weather.hu;
      console.log(this.weatherTarget);
      this.subWeather.next(this.weatherTarget);
    });
  }
}
