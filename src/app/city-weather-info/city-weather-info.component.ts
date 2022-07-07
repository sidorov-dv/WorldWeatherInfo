import { Component, OnInit } from '@angular/core';
import { GetCityWeatherService } from '../get-city-weather.service';
import { GetImageService } from '../get-image.service';
import { WeatherInfo } from '../weather';

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.scss']
})
export class CityWeatherInfoComponent implements OnInit {

  targetCityName: string = '';
  targetTemperature: any;
  targetPressure: any;
  targetHumidity: any;
  // firstTargetCityName: string = '';
  // firstTargetTemperature: any;
  // firstTargetPressure: any;
  // firstTargetHumidity: any;

  imgUrl: string | undefined;
  imageToShowWeather: string | undefined;


  constructor(private getCityWeatherService: GetCityWeatherService, private imageService: GetImageService) { }

  ngOnInit() {
    this.getCityWeatherService.showWeatherInfo();
    this.getCityWeatherService.subWeather.subscribe((obj: WeatherInfo) => {
      this.targetCityName = obj.cityName;
      this.targetTemperature = obj.temperature;
      this.targetPressure = obj.pressure;
      this.targetHumidity = obj.humidity;
      this.getPicture();
    });
    

    // this.getCityWeatherService.subWeatherFirst.subscribe((obj: WeatherInfo) => {
    //   this.firstTargetCityName = obj.cityName;
    //   this.firstTargetTemperature = obj.temperature;
    //   this.firstTargetPressure = obj.pressure;
    //   this.firstTargetHumidity = obj.humidity;
    // });
    // this.getCityWeatherService.getCitiesFirst();
  }

  get temp() {
    return this.targetTemperature;
  }

  getPicture() {
    const indTemp = this.temp;
    let curIndex = 0;
    const tempChose: { min: number, max: number }[] = [{ min: -50, max: -5 }, { min: -5, max: 10 }, { min: 10, max: 25 }, { min: 25, max: 50 }];
    const imgArr = ['https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920',
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920',
      'https://images.pexels.com/photos/86431/field-of-poppies-brandenburg-nature-royalty-free-86431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920',
      'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920',
      'https://images.pexels.com/photos/258136/pexels-photo-258136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920'];

    curIndex = tempChose.findIndex((element: { min: number, max: number }) => (indTemp > element.min) && (indTemp <= element.max)) || 4;
    this.imgUrl = imgArr[curIndex];
    // this.imageService.getImageF(this.imgUrl)
    //   .then((result: any) => this.createImageFromBlob(result))
    //   .catch((e: any) => console.error(e))

    this.imageService.getImage(this.imgUrl)
      .subscribe({
        next: (data: Blob) => this.createImageFromBlob(data),
        error: (error: any) => console.log(error)
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.addEventListener('load', () => {
      this.imageToShowWeather = 'url(' + reader.result + ')';
    })
    reader.addEventListener('error', () =>
      console.log(JSON.stringify(reader.error)))
  }
}

