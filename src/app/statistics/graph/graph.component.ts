import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Statistics } from 'src/app/core/models/statistics.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() statisticsData: Statistics
  width: number = 600;
  height: number = 250;
  barHeight: number = 35;
  barMargin: number = 2;
  margin: any;
  svg: any;
  xScale;
  yScale;

  constructor() {
  }

  ngOnInit() {
    this.setup();
    this.buildSvg();
    this.populate();
    this.addText();

  }

  setup() {
    this.margin = {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15
    }

    this.xScale = d3.scaleLinear().range([0, this.width - this.margin.right]).domain([0, this.statisticsData.hitCount])

  }

  buildSvg() {
    this.svg = d3.select(".chart")
      .attr('width', this.width)
      .attr('height', this.height)
      .style('background-color','rgb(96,125,139)')
      .append('g')
      .attr('transform', d => 'translate(' + 0 + ',' + (this.height - this.statisticsData.lastClient.length * (this.barHeight + this.barMargin)) / 2 + ')')
      .selectAll('rect')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d => this.margin.left)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.width - this.margin.right - this.margin.left)
      .attr('height', this.barHeight)
      .attr('fill', 'rgba(255,255,255,0.5)')
      /*.style('stroke', 'black')
      .style('stroke-opacity', 0.2)*/
      .exit()

  }

  populate() {
    this.svg
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d => this.margin.left)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.xScale(d.frequency) - this.margin.right - this.margin.left)
      .attr('height', this.barHeight)
      .attr('fill', 'rgba(0,0,0,0.1)')
  }

  addText() {
    this.svg
    .data(this.statisticsData.lastClient)
    .enter()
    .append('text')
    .attr('x', d => this.margin.left + this.margin.left)
    .attr('y', (d, i) => i * (this.barHeight + this.barMargin) +  22)
    .text(d=> d.value)
    .attr('fill','white')

    this.svg
    .data(this.statisticsData.lastClient)
    .enter()
    .append('text')
    .attr('x', d =>  this.width - this.margin.right - this.margin.left - 40)
    .attr('y', (d, i) => i * (this.barHeight + this.barMargin) +  22)
    .text(d=> (d.frequency*100/this.statisticsData.hitCount).toFixed(1)+'%')
    .attr('fill','white')
   
  }
  

}
