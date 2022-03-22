export interface ModelParameter {
  name: string;
  description?: string;
  default: number;
  range?: { min: number, max: number }
  stepSize?: number
}

export interface ParameterMetadata extends ModelParameter {
  key: string;
}
