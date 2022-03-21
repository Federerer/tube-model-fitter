import { getParameters, TriodeModel } from '../../model/triode-model';
import { Component, Input, OnInit } from '@angular/core';
import { ModelParameter, ParameterMetadata } from 'src/app/model/models/interfaces/model-parameter';
import { mode } from 'd3';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class PrametersComponent {

  private _model: any;

  @Input() set model(value: any) {
    this._model = value;
    this.parameters = getParameters(value);
  }

  get model() {
    return this._model;
  }

   parameters?: ParameterMetadata[];

  constructor() { }

}
