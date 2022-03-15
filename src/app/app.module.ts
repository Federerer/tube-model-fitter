import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurveChartComponent } from './components/curve-chart/curve-chart.component';
import { OnResizeDirective } from './directives/on-resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurveChartComponent,
    OnResizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
