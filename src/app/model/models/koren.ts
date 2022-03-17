import { EventEmitter } from '@angular/core';
import { Parameter, TriodeModelBase } from './../triode-model';

export class Koren extends TriodeModelBase {

  name: string = "Koren";

  @Parameter({ name: 'Kp', default: 996 })
  kp!: number;

  @Parameter({ name: 'μ', description: 'Amplificaton factor', default: 94 })
  mu!: number;

  @Parameter({ name: 'Kvb', default: 280.6 })
  kvb!: number;

  @Parameter({ name: 'Ex', description: 'Exponent', default: 1.498 })
  ex!: number;

  @Parameter({ name: 'Kg', default: 2226 })
  kg!: number;

  @Parameter({ name: 'Vct', default: .6517 })
  vct!: number;

  getPlateCurrent(vg: number, vp: number): number {
    const e1 = Math.log1p(Math.exp(this.kp * (1.0 / this.mu + (vg + this.vct) / Math.sqrt(this.kvb + vp * vp)))) * vp / this.kp;
    return e1 > 0 ? 2 * Math.pow(e1, this.ex) / this.kg : 0;
  }

}
