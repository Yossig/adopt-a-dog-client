import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-by-graph',
  templateUrl: './group-by-graph.component.html',
  styleUrls: ['./group-by-graph.component.css']
})
export class GroupByGraphComponent implements OnInit {

  @Input() groupObsv: Observable<any>
  @Input() group: any;
  width: number = 750;
  height: number = 500;
  barWidth: number = 40;
  margin: any;
  svg: any;
  xScale: any;
  yScale: any;
  yTicks: any;
  xAxis: any;
  yAxis: any;
  max: any;
  min: any;

  constructor() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    }

    this.width = this.width - this.margin.left - this.margin.right
    this.height = this.height - this.margin.top - this.margin.bottom
  }

  ngOnInit() {
    this.groupObsv.subscribe(group => {
      this.group = group;
      this.setup();
      this.clearSvg();
      this.buildSvg();
      this.buildXAxis();
      this.buildYAxis();
      this.populate();
    })

    this.setup();
    this.clearSvg();
    this.buildSvg();
    this.buildXAxis();
    this.buildYAxis();
    this.populate();

  }

  setup() {
    this.max = d3.max(this.group.data, (d: any) => d.count);
    this.xScale = d3.scaleBand().range([0, this.width]).domain(this.group.data.map(d => d._id))
    this.yScale = d3.scaleLinear().range([0, this.height]).domain([0, this.max])
    this.yTicks = d3.scaleLinear().range([this.height, 0]).domain([0, this.max])
  }

  clearSvg() {
    d3.select('.group-by-chart').selectAll('g').remove()
  }

  buildSvg() {
    this.svg = d3.select('.group-by-chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
  }

  buildXAxis() {
    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(this.group.data.length)
      .tickPadding(10)

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(this.xAxis)
  }

  buildYAxis() {
    this.yAxis = d3.axisLeft(this.yTicks)
      .ticks(5)
      .tickPadding(15)

    this.svg.append('g')
      .call(this.yAxis)
  }

  populate() {
    this.svg.selectAll('rect')
      .data(this.group.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (this.width / this.group.data.length) + (this.width / this.group.data.length) / 2 - this.barWidth / 2)
      .attr('y', d => this.height - this.yScale(d.count))
      .attr('width', this.barWidth)
      .attr('height', d => this.yScale(d.count))
      .attr('fill', '#000')
  }

}
