import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import PropTypes from 'prop-types';

import Axes from './Axes'
import Line from './Line'
import Legend from './Legend'

const margins = {
  top: 50,
  right: 200,
  bottom: 100,
  left: 100,
};
const colors = ['DarkSalmon', 'MediumVioletRed', 'PeachPuff', 'Crimson', 'PapayaWhip'];

export default class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleLinear()
    this.yScale = scaleLinear()

    this.state = {
      width: window.innerWidth - 200,
      height: window.innerHeight - 100,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    console.log('update');
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
  }

  render() {
    this.maxValue = Math.max(...this.props.datasets.map(x => x.dataset.length)) - 1

    // scaleBand type
    const xScale = this.xScale
      .domain([0, this.maxValue])
      .range([margins.left, this.state.width - margins.right])

    // scaleLinear type
    const yScale = this.yScale
      // scaleLinear domain required at least two values, min and max
      .domain([0, 1])
      .range([this.state.height - margins.bottom, margins.top])

    const svgDimensions = { width: this.state.width, height: this.state.height };

    return (
      <svg id="chart" width={this.state.width} height={this.state.height} ref={(c) => { this.svg = c; }}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        {this.props.datasets.map((item, index) => (
          <Line
            key={item.id}
            stroke={colors[index]}
            scales={{ xScale, yScale }}
            dataset={item.dataset}
          />
        ))}
        <Legend />
      </svg>
    )
  }
}

Chart.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
}
