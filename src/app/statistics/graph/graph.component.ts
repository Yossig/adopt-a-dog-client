import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  lastClient: Array<any>
  hitCount: number

  constructor(private statisticsService: StatisticsService) {
    this.hitCount = 600
   }

  radiusScale(val: any) {
    return d3.scaleSqrt().domain([1, this.hitCount]).range([0, 100])(val);
  }

  ngOnInit() {
    this.statisticsService.getLastClient().subscribe(res => {

      this.lastClient = res;
      var width = 650;
      var height = 650;
      var hitCount = this.hitCount
      var radiusScale = d3.scaleSqrt().domain([1, this.hitCount]).range([0, 100])

      var circles = d3.select(".chart")
        .selectAll("div")
        .data(this.lastClient)
        .enter()
        .append("circle")
        .attr("r", function (d) {
          return radiusScale(d.frequency);
        })
        .attr("fill", function(d) {
          const prec = d.frequency * 100 / hitCount
          if(prec >= 90.0) {
            return "lightgreen"
          }
          if(prec >= 80) {
            return "lightblue"
          }
          if(prec >= 50) {
            return "lightyellow"
          }
        })

      var texts = d3.select(".chart")
        .selectAll("div")
        .data(this.lastClient)
        .enter()
        .append("text")
        .text(function (d) {
          return `${d.value}`
        })
        .style("font-size", "1.5em")

      var precents = d3.select(".chart")
        .selectAll("div")
        .data(this.lastClient)
        .enter()
        .append("text")
        .text(function (d) {
          return `${(d.frequency * 100 / hitCount).toFixed(1)}%`
        })
        .style("font-weight", "bold")


      var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function (d: any) {
          return radiusScale(d.frequency) + 1
        }))

      simulation.nodes(this.lastClient)
        .on('tick', ticked);

      function ticked() {
        circles.attr("cx", function (d) {
          return d.x
        })
          .attr("cy", function (d) {
            return d.y
          })
        texts.attr("x", function (d) {
          return d.x - (d.value.length / 2) * 10
        })
          .attr("y", function (d) {
            return d.y
          })
        precents.attr("x", function (d) {
          return d.x - (d.value.length / 2) * 10
        })
          .attr("y", function (d) {
            return d.y + 19
          })

      }

    })


  }

}
