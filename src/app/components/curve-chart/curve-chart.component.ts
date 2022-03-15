import { TriodeModel } from './../../model/triode-model';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { of } from 'rxjs';
import { map } from 'd3';

@Component({
  selector: 'app-curve-chart',
  templateUrl: './curve-chart.component.html',
  styleUrls: ['./curve-chart.component.scss']
})
export class CurveChartComponent implements OnInit {

  @Input() public maxVoltage: number = 250;
  @Input() public maxCurrent: number = .1;
  @Input() public model?: TriodeModel;

  constructor() { }

  ngOnInit(): void {
    this.render();
  }

  public render() {

    const model = this.model;
    if (!model) {
      return;
    }

    const width = 800;
    const height = 600;
    const x = d3.scaleLinear()
      .domain([0, this.maxVoltage])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, this.maxCurrent])
      .range([height, 0]);

    const svg = d3.select('svg#grid');

    svg.attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "padding: 20px; max-width: 100%; height: auto; height: intrinsic; overflow: visible");

    svg.append('g')
      .attr('class', 'grid')
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(-height));

    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).tickSize(-width));

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
