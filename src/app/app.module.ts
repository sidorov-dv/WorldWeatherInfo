import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { StatesListComponent } from './states-list/states-list.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { HpatommhgPipe } from './hpatommhg.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    StatesListComponent,
    CityWeatherInfoComponent,
    PageNotFoundComponent,
    CitiesListComponent,
    HpatommhgPipe,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    NgSelectModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
