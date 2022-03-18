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

  public model: TriodeModel;
  public opacity: number = 1;
  public imageUrl: SafeUrl = "";
  public maxVoltage: number = 400;
  public maxCurrent: number = .009;

  constructor(private sanitizer: DomSanitizer) {
    this.model = new Koren();
    //  this.model = new DempwolfZolzer();
  }

  onPaste(e: ClipboardEvent) {

    const items = e.clipboardData?.items;

    if(!items) {
      return;
    }

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        if (blob) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
        }
      }
    }

  }
}
