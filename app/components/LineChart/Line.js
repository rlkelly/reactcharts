import * as d3 from 'd3';
import React from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';


export default class Line extends React.Component {
  constructor() {
    super()
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    this.updateLine = this.updateLine.bind(this);
  }
  componentDidMount() {
    this.updateLine()
  }
  componentDidUpdate() {
    this.updateLine()
  }
  updateLine() {
    select(`#line${this.props.stroke}`)
      .on('mouseover', function () {
        d3.selectAll('.line')
          .style('stroke-width', '2px')
          .style('opacity', 0.4);
        d3.select(this)
          .style('stroke-width', '6px')
          .style('opacity', 1)
      })
      .on('mouseout', () => {
        d3.selectAll('.line')
          .style('stroke-width', '2.5px')
          .style('opacity', 0.9)
      });

    d3.select('#chart').selectAll(`.dot${this.props.stroke}`).remove()

    select('svg')
      .selectAll(`dot${this.props.stroke}`)
      .data(this.props.dataset)
      .enter()
      .append('circle') // Uses the enter().append() method
      .attr('class', `dot${this.props.stroke}`) // Assign a class for styling
      .attr('fill', this.props.stroke)
      .attr('cx', (_, i) => this.props.scales.xScale(i))
      .attr('cy', d => this.props.scales.yScale(d.y))
      .attr('r', 4)
      .on('mouseover', (d) => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        this.tooltip.html(`tooltip ${d.y.toPrecision(4)}
                          this color is ${this.props.stroke}!
                          More Stuff!`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  }
  render() {
    const { xScale, yScale } = this.props.scales;
    const { dataset } = this.props;

    const line = d3.line()
      .x((_, i) => xScale(i)) // set the x values for the line generator
      .y(d => yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    return (
      <path id={`line${this.props.stroke}`} className="line" stroke={this.props.stroke} d={line(dataset)} />
    );
  }
}

Line.propTypes = {
  scales: PropTypes.object.isRequired,
  dataset: PropTypes.arrayOf(PropTypes.object).isRequired,
  stroke: PropTypes.string.isRequired,
}
