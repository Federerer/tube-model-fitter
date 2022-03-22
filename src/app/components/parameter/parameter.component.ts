import { Component, Input, OnInit, Optional, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  @Input() label?: string;

  @Input() stepSize?: number;
  private _value: number = 0;

  @Input() range?: { min: number, max: number }

  private _sliderRange?: { min: number; max: number; };

  get sliderRange() {
    return this.range ?? this._sliderRange ?? { min: this.defaultValue / 2, max: this.defaultValue * 2 };
  }

  @Input() get value(): number {
    return this._value;
  };

  set value(newValue: number) {
    this._value = newValue;
    this.valueChange.emit(newValue);
  }

  @Input() defaultValue: number = 0;

  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onTextInput(value: number) {
    if(!this.range) {
      this._sliderRange = { min: value / 2, max: value * 2 };
    }
  }

}
