import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-bar-chart',
  template: `<svg #chart></svg>`,
})
export class ChartComponent implements OnChanges {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;
  @Input() repositories: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['repositories'].currentValue.length) {
      this.createChart();
    }
  }

  createChart() {
    const element = this.chartElement.nativeElement;
    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element).attr('width', 800).attr('height', 400);

    const x = d3
      .scaleBand()
      .domain(this.repositories.map((d) => d.name))
      .range([0, 800])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.repositories, (d) => d.stars)!])
      .range([400, 0]);

    svg
      .append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,400)')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('.bar')
      .data(this.repositories)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name)!)
      .attr('y', (d) => y(d.stars))
      .attr('width', x.bandwidth())
      .attr('height', (d) => 400 - y(d.stars))
      .attr('fill', 'steelblue');

    svg
      .selectAll('.label')
      .data(this.repositories)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
      .attr('y', (d) => 395)
      .attr('text-anchor', 'middle')
      .text((d) => d.stars);
  }
}
