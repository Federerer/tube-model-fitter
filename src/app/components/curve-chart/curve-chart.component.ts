import { TriodeModel } from './../../model/triode-model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, combineLatest, filter, map, merge, NEVER, of, startWith, Subject, switchMap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-curve-chart',
  templateUrl: './curve-chart.component.html',
  styleUrls: ['./curve-chart.component.scss']
})
export class CurveChartComponent {

  private _maxVoltage: number = 250;
  @Input() public set maxVoltage(value: number) {
    this._maxVoltage = value;
    this.render();
  };

  private _maxCurrent: number = .1;
  @Input() public set maxCurrent(value: number) {
    this._maxCurrent = value;
    this.render();
  };


  private _model = new BehaviorSubject<TriodeModel | null>(null);
  private _size = new BehaviorSubject<{ width: number, height: number } | null>(null);

  @Input() public set model(value: TriodeModel) {
    this._model.next(value);
  };

  @ViewChild('grid') elementView?: ElementRef<SVGElement>;

  ngAfterViewInit() {
    this.render();
  }

  constructor() {
    merge(
      this._model.pipe(
        switchMap(model => model ? model.paramsChanged.pipe(startWith(undefined)) : NEVER),
      ),
      this._size
    ).subscribe(() => this.render());
  }

  public OnResize(event: { width: number, height: number }) {
    this._size.next(event);
  }

  public render() {

    const svgElement = this.elementView;
    const model = this._model?.value;
    const size = this._size?.value;

    if (!model || !svgElement || !size) {
      return;
    }

    const { width, height } = size;

    const svg = d3.select(svgElement.nativeElement);

    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain([0, this._maxVoltage])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, this._maxCurrent])
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'grid')
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y));

    const vgs = d3.range(1.2, -4, -.5);

    const lines = vgs.map(vg =>
    ({
      vg,
      fn: d3.line()
        .defined(v => v[1] <= this._maxCurrent)
        .x(v => x(v[0]))
        .y(v => y(v[1])),
      color: vg > 0 ? 'red' : 'blue'
    }));

    const lineArea = svg.append('g');

    const pts = d3.range(0, this._maxVoltage + 1, 5);

    for (const line of lines) {
      lineArea.append("path")
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", 2)
        .attr("d", line.fn(pts.map(v => [v, model.getPlateCurrent(line.vg, v)])));
    }
  }

}
