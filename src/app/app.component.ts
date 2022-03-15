import { DempwolfZolzer } from './model/models/dempwolf-zolzer';
import { Koren } from './model/models/koren';
import { TriodeModel } from './model/triode-model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public model: TriodeModel;

  /**
   *
   */
  constructor() {
    this.model = new Koren();
    // this.model = new DempwolfZolzer();
  }
}
