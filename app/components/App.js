import { select, range, randomUniform } from 'd3';
import React from 'react';

import Chart from './LineChart/Chart';

const n = 5;
function makeDataset() {
  return range(n).map(() => { return { y: randomUniform(1)() } })
}
let counter = 0

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      datasets: [{ dataset: makeDataset(), id: Math.random() }],
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    counter += 1
    if (counter > 4) {
      select('#chart').selectAll('circle').remove()
      this.setState({
        datasets: [{ dataset: makeDataset(), id: Math.random() }],
      });
      counter = 0;
    } else {
      this.setState({
        datasets: [...this.state.datasets, { dataset: makeDataset(), id: Math.random() }],
      })
    }
  }
  render() {
    document.body.style.overflow = 'hidden';
    return (
      <div>
        <h1 height={100}>
          Number of Sets: {this.state.datasets.length}
        </h1>
        <button onClick={this.toggle}> toggle </button>
        <Chart datasets={this.state.datasets} />
      </div>
    );
  }
}
