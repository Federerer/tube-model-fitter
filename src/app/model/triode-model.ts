import { ModelParameter, ParameterMetadata } from './models/interfaces/model-parameter';
import { EventEmitter } from "@angular/core";
import 'reflect-metadata';

export interface TriodeModel {
  name: string;
  getPlateCurrent(vg: number, vp: number): number;
  paramsChanged: EventEmitter<void>;
  [index: string | symbol]: any;
  getParameters(): ParameterMetadata[]
}

export abstract class TriodeModelBase implements TriodeModel {

  abstract name: string;

  private parameters: ParameterMetadata[];

  constructor() {
    this.parameters = Reflect.getMetadata(parameterMetadataKey, this);
  }

  getParameters(): ParameterMetadata[] {
    return this.parameters;
  }

  abstract getPlateCurrent(vg: number, vp: number): number

  paramsChanged = new EventEmitter<void>();
  [index: string]: any;

}

const parameterMetadataKey = 'model-parameter';
const parameterPrefix = 'p_'

export function Parameter(info: ModelParameter): PropertyDecorator {
  return (target, key): void => {
    let newKey = `${parameterPrefix}${key.toString()}`;
    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: function(this: TriodeModel) { return this[newKey] ?? info.default },
      set: function(this: TriodeModel, newVal) {
        this[newKey] = newVal;
        console.log(`Parameter ${key.toString()} changed: ${newVal}`)
        this.paramsChanged?.emit();
      },
      enumerable: true,
      configurable: true
    });

    let parameters = Reflect.getOwnMetadata(parameterMetadataKey, target);
    if (!parameters) {
        parameters = Reflect.hasMetadata(parameterMetadataKey, target)
            ? Reflect.getMetadata(parameterMetadataKey, target).slice(0)
            : [];

        Reflect.defineMetadata(parameterMetadataKey, parameters, target);
    }

    parameters.push({...info, key});
  };
}
