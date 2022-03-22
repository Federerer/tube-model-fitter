import { Parameter } from "./triode-model";

export class Settings {

  @Parameter({ name: "Image opacity", default: .5, stepSize: .01, range: { min: 0, max: 1 } })
  opacity!: number;

  @Parameter({ name: "Maximum voltage", default: 400, stepSize: 10 })
  public maxVoltage!: number;

  @Parameter({ name: "Maximum current", default: .01, stepSize: .0005 })
  public maxCurrent!: number;

  @Parameter({ name: "Number of curves", default: 5, stepSize: 1, range: { min: 1, max: 15 } })
  public gridVoltages!: number;

  @Parameter({ name: "Curve spacing", default: 1, stepSize: .1, range: { min: .1, max: 10 } })
  public gridSpacing!: number;
}
