import { EventEmitter } from '@angular/core';
import { Parameter, TriodeModel, TriodeModelBase } from '../triode-model';

export class DempwolfZolzer extends TriodeModelBase {

  name: string = "Dempwolf/Zolzer";

  @Parameter({ name: 'G', default: 2.242e-3 })
  g!: number;

  @Parameter({ name: 'C', description: 'Cathode current adaption factor', default: 3.4 })
  c!: number;

  @Parameter({ name: 'γ', description: 'Exponent', default: 1.26 })
  gamma!: number;

  @Parameter({ name: 'μ', description: 'Amplificaton factor', default: 103.2 })
  mu!: number;

  @Parameter({ name: 'Gg', default: 6.177e-4 })
  gg!: number;

  @Parameter({ name: 'Cg', description: 'Grid current adaption factor', default: 9.901 })
  cg!: number;

  @Parameter({ name: 'G', default: 1.314 })
  xi!: number;

  @Parameter({name: 'Ig0', default: 8.025e-8})
  ig0!: number;


  getPlateCurrent(vg: number, vp: number): number {
    const exk = this.c * ((vp / this.mu) + vg);
    const ik = this.g * Math.pow(Math.log1p(Math.exp(exk)) / this.c, this.gamma);
    const exg = this.cg * vg;
    const ig = this.gg * Math.pow(Math.log1p(Math.exp(exg)) / this.cg, this.xi) + this.ig0;

    return ik - ig;
  }

}
