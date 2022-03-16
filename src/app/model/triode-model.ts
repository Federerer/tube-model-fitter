import { ModelParameter } from './models/interfaces/model-parameter';
import { EventEmitter } from "@angular/core";

export interface TriodeModel {
  name: string;
  getPlateCurrent(vg: number, vp: number): number;
  paramsChanged: EventEmitter<void>;
  [index: string | symbol]: any;
}

export function parameter() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}


export function Parameter(): PropertyDecorator {
  return (target, key): void => {
    let newKey = `_${key.toString()}`;
    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: function(this: TriodeModel) { return this[newKey] },
      set: function(this: TriodeModel, newVal) {
        this[newKey] = newVal;
        this.paramsChanged?.emit();
      },
      enumerable: true,
      configurable: true
    });
  };
}
