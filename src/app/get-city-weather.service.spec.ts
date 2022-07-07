import { TestBed } from '@angular/core/testing';

import { GetCityWeatherService } from './get-city-weather.service';

describe('GetCityWeatherService', () => {
  let service: GetCityWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
