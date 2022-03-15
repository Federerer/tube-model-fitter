export interface TriodeModel {
  name: string;
  getPlateCurrent(vg: number, vp: number): number;
}
