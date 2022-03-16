import { DempwolfZolzer } from './model/models/dempwolf-zolzer';
import { Koren } from './model/models/koren';
import { TriodeModel } from './model/triode-model';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public model: Koren;

  public imageUrl: SafeUrl = "";

  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {
    this.model = new Koren();
    // this.model = new DempwolfZolzer();
  }

  public onChange(val: any) {
    this.model.ex = Number(val);
  }

  onPaste(e: any) {
    console.log(e);
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        console.log(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(blob)
        );
      }
    }
  }
}
