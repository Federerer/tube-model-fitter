import { TriodeModel } from './../../model/triode-model';
import { Component, Input, OnInit } from '@angular/core';
import { ModelParameter, ParameterMetadata } from 'src/app/model/models/interfaces/model-parameter';
import { mode } from 'd3';

@Component({
  selector: 'app-prameters',
  templateUrl: './prameters.component.html',
  styleUrls: ['./prameters.component.scss']
})
export class PrametersComponent implements OnInit {

  @Input() model?: TriodeModel;

  public parameters?: ParameterMetadata[];

  constructor() { }

  onChange(name: string, value: string) {
    this.model![name] = Number(value);
  }

  ngOnInit(): void {
    if(!this.model){
      return;
    }

     this.parameters = this.model.getParameters();

  }

}
