import { ParameterMetadata } from './model/models/interfaces/model-parameter';
import { DempwolfZolzer } from './model/models/dempwolf-zolzer';
import { Koren } from './model/models/koren';
import { getParameters, TriodeModel } from './model/triode-model';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Settings } from './model/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public model: TriodeModel = new Koren();

  public settings = new Settings();

  public imageUrl: SafeUrl = "";

  constructor(private sanitizer: DomSanitizer) {}

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
