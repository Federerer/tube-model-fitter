import { EventEmitter } from '@angular/core';
import { Parameter, parameter, TriodeModel } from './../triode-model';

export class Koren implements TriodeModel {

  paramsChanged: EventEmitter<void> = new EventEmitter();

  name: string = "Koren";

  @Parameter() kp: number = 996;
  @Parameter() mu: number = 94;
  @Parameter() kvb: number = 280.6;
  @Parameter() ex: number = 1.498;
  @Parameter() kg: number = 2226;
  @Parameter() vct: number = .6517;

  getPlateCurrent(vg: number, vp: number): number {
    const e1 = Math.log1p(Math.exp(this.kp * (1.0 / this.mu + (vg + this.vct) / Math.sqrt(this.kvb + vp * vp)))) * vp / this.kp;
    return e1 > 0 ? 2 * Math.pow(e1, this.ex) / this.kg : 0;
  }

}
