import React from 'react';


export default class Legend extends React.Component {
  render() {
    return (
      <g className="legend" transform="translate(120, 80)" style={{ 'font-size': '20px', 'background-color': 'white' }}>
        <rect className="legend-box" fill="white" height="80" width="80" />
        <text x="1em" y="1em"> Hello </text>
        <text x="1em" y="2em"> Hello </text>
        <text x="1em" y="3em"> Hello </text>
      </g>
    );
  }
}
