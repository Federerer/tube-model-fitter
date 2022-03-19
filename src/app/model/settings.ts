import { NumberValueAccessor } from "@angular/forms";
import { Parameter } from "./triode-model";

export class Settings {

  @Parameter({name: "Image opacity", default: .5})
  opacity!: number;

  @Parameter({name: "Maximum voltage", default: 400})
  public maxVoltage!: number;

  @Parameter({name: "Maximum current", default: .01})
  public maxCurrent!: number;

  @Parameter({name: "Number of curves", default: 5})
  public gridVoltages: number = 5;

  @Parameter({name: "Curve spacing", default: .5})
  public gridSpacing: number = .5;
}
