import { TriodeModel } from './../../model/triode-model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, combineLatest, filter, map, NEVER, of, Subject, switchMap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-curve-chart',
  templateUrl: './curve-chart.component.html',
  styleUrls: ['./curve-chart.component.scss']
})
export class CurveChartComponent {

  @Input() public maxVoltage: number = 250;
  @Input() public maxCurrent: number = .1;

  private modelSubject = new BehaviorSubject<TriodeModel|null>(null);
  private resizeSubject = new BehaviorSubject<{width: number, height: number}|null>(null);

  @Input() public set model(value: TriodeModel) {
    this.modelSubject.next(value);
  };

  @ViewChild('grid') elementView?: ElementRef<SVGElement>;

  constructor() {
    const x = this.modelSubject.pipe(
      switchMap(model => model ? model.paramsChanged.asObservable().pipe(map(_ => model)) : NEVER),
    );
    combineLatest([x, this.resizeSubject]).pipe(filter(([model, size]) => !!model && !!size)).subscribe(([model, size]) => {
      this.render(model, size!)
    })
   }

  public OnResize(event: {width: number, height: number}) {
    this.resizeSubject.next(event);
  }

  public render(model: TriodeModel, size: {width: number, height: number}) {

    const svgElement = this.elementView;
    if (!model || !svgElement || !size) {
      return;
    }

    const {width, height} = size;

    const svg = d3.select(svgElement.nativeElement);

    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain([0, this.maxVoltage])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, this.maxCurrent])
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'grid')
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y));

    const vgs = d3.range(1.2, -3, -.3);

    const lines = vgs.map(vg =>
    ({
      vg,
      fn: d3.line()
        .defined(v => v[1] <= this.maxCurrent)
        .x(v => x(v[0]))
        .y(v => y(v[1])),
      color: vg > 0 ? 'red' : 'blue'
    }));

    const lineArea = svg.append('g');

    for (const line of lines) {
      lineArea.append("path")
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", 1)
        .attr("d", line.fn(d3.range(this.maxVoltage + 1).map(v => [v, model.getPlateCurrent(line.vg, v)])));
    }
  }

}
