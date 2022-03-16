import { EventEmitter } from '@angular/core';
import { Parameter, TriodeModel } from '../triode-model';

export class DempwolfZolzer implements TriodeModel {

  paramsChanged: EventEmitter<void> = new EventEmitter();

  name: string = "Dempwolf/Zolzer";

  @Parameter() g: number = 2.242e-3;
  @Parameter() c: number = 3.4;
  @Parameter() gamma: number = 1.26;
  @Parameter() mu: number = 103.2;

  @Parameter() gg: number = 6.177e-4;
  @Parameter() cg: number = 9.901;
  @Parameter() xi: number = 1.314;
  @Parameter() ig0: number = 8.025e-8;


  getPlateCurrent(vg: number, vp: number): number {
    const exk = this.c * ((vp / this.mu) + vg);
    const ik = this.g * Math.pow(Math.log1p(Math.exp(exk)) / this.c, this.gamma);
    const exg = this.cg * vg;
    const ig = this.gg * Math.pow(Math.log1p(Math.exp(exg))/ this.cg, this.xi) + this.ig0;

    return ik - ig;
  }

}
