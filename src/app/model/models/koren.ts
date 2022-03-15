import { TriodeModel } from './../triode-model';

export class Koren implements TriodeModel {

  name: string = "Koren";

  kp: number = 996;
  mu: number = 94;
  kvb: number = 280.6;
  ex: number = 1.498;
  kg: number = 2226;
  vct: number = .6517;

  getPlateCurrent(vg: number, vp: number): number {
    const e1 = Math.log1p(Math.exp(this.kp * (1.0 / this.mu + (vg + this.vct) / Math.sqrt(this.kvb + vp * vp)))) * vp / this.kp;
    return e1 > 0 ? 2 * Math.pow(e1, this.ex) / this.kg : 0;
  }

}
