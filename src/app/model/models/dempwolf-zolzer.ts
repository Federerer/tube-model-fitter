import { TriodeModel } from '../triode-model';

export class DempwolfZolzer implements TriodeModel {

  name: string = "Dempwolf/Zolzer";

  g: number = 2.242e-3;
  c: number = 3.4;
  gamma: number = 1.26;
  mu: number = 103.2;

  gg: number = 6.177e-4;
  cg: number = 9.901;
  xi: number = 1.314;
  ig0: number = 8.025e-8;


  getPlateCurrent(vg: number, vp: number): number {
    const exk = this.c * ((vp / this.mu) + vg);
    const ik = this.g * Math.pow(Math.log1p(Math.exp(exk)) / this.c, this.gamma);
    // Expression exg = Cg * Vgk;
    //                 ig = Call.If(exg > -50, Gg * Binary.Power(Ln1Exp(exg) / Cg, Xi), 0) + Ig0;
    const exg = this.cg * vg;
    const ig = this.gg * Math.pow(Math.log1p(Math.exp(exg))/ this.cg, this.xi) + this.ig0;

    return ik - ig;
  }

}
