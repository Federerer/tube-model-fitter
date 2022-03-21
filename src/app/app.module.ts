import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurveChartComponent } from './components/curve-chart/curve-chart.component';
import { OnResizeDirective } from './directives/on-resize.directive';

import { ResizableModule } from 'angular-resizable-element';
import { ResizeBoxComponent } from './components/resize-box/resize-box.component';
import { PrametersComponent } from './components/parameters/parameters.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CurveChartComponent,
    OnResizeDirective,
    ResizeBoxComponent,
    PrametersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
