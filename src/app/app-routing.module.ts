import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { StatesListComponent } from './states-list/states-list.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: TitleComponent,
  },
  {
    path: "states-list",
    component: StatesListComponent,
  },
  {
    path: "cities-list",
    component: CitiesListComponent,
  },
  {
    path: "weather/:selectedCity",
    component: CityWeatherInfoComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
