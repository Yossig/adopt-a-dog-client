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
  width: number = 750;
  height: number = 300;
  barHeight: number = 35;
  barMargin: number = 2;
  margin: any;
  svg: any;
  xScale: any;
  max: any;
  min: any;

  constructor() {
  }

  ngOnInit() {
    this.setup();
    this.buildSvg();
    this.buildTemplate();
    this.populate();
    this.addText();

  }

  setup() {
    this.margin = {
      top: 15,
      right: 15,
      bottom: 15,
      left: 85
    }

    this.xScale = d3.scaleLinear().range([0, this.width - this.margin.right]).domain([0, this.statisticsData.hitCount])
    this.max = d3.max(this.statisticsData.lastClient, d => d.frequency)
    this.min = d3.min(this.statisticsData.lastClient, d => d.frequency)
  }

  buildSvg() {
    this.svg = d3.select(".chart")
      .attr('width', this.width)
      .attr('height', this.height)
      .style('background-color', 'rgb(96,125,139)')
      .append('g')
      .attr('transform', d => 'translate(' + 0 + ',' + (this.height - this.statisticsData.lastClient.length * (this.barHeight + this.barMargin)) * 3 / 5 + ')')
  }

  buildTemplate() {
    this.svg
      .selectAll('rect')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d => this.margin.left)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.width - this.margin.right - this.margin.left)
      .attr('height', this.barHeight)
      .attr('fill', d => {
        if (d.frequency === this.max) {
          return 'rgba(0,255,0,0.5)'
        } else if (d.frequency === this.min) {
          return 'rgba(255,0,0,0.5)'
        } else {
          return ('rgba(255,255,255,0.5)')
        }
      })

    d3.select(".chart")
      .append('text')
      .attr('x', (this.width - 248) / 2)
      .attr('y', 50)
      .text("Some Stats")
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-size', '3em')

    d3.select(".chart")
      .append('text')
      .attr('x', 10)
      .attr('y', this.height -10)
      .text("*Data is according to the last client visited the site")
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-size', '0.75em')

  }

  populate() {
    this.svg.selectAll('g')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('rect')
      .attr('x', d => this.margin.left)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin))
      .attr('width', d => this.xScale(d.frequency) - this.margin.right - this.margin.left)
      .attr('height', this.barHeight)
      .attr('fill', 'rgba(0,0,0,0.2)')
  }

  addText() {
    this.svg.selectAll('g')
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => this.margin.left + 10)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin) + 22)
      .text(d => d.value)
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .exit()
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => this.xScale(d.frequency) - this.margin.right - 45)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin) + 22)
      .text(d => (d.frequency * 100 / this.statisticsData.hitCount).toFixed(1) + '%')
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .exit()
      .data(this.statisticsData.lastClient)
      .enter()
      .append('text')
      .attr('x', d => 10)
      .attr('y', (d, i) => i * (this.barHeight + this.barMargin) + 22)
      .text(d => d.field)
      .attr('fill', 'white')
      .style('font-family', "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif")
      .style('font-weight', "bold")
  }


}
