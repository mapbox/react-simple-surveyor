'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const survey = require('../src/survey');

const WidthDisplay = survey(function WidthDisplay(props) {
  return (
    <div style={{ padding: 20, background: '#eee' }}>
      {props.width}px wide
    </div>
  );
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      randomWidth: 500
    };
    this.setRandomWidth = this.setRandomWidth.bind(this);
  }

  setRandomWidth() {
    this.setState({
      randomWidth: Math.random() * (window.innerWidth - 50) + 50
    });
  }

  render() {
    return (
      <div style={{ margin: '20px 10px' }}>

        <div style={{ marginBottom: 10 }}>
          Full width:
        </div>
        <div style={{ marginBottom: 20 }}>
          <WidthDisplay />
        </div>

        <div style={{ marginBottom: 10 }}>
          Max-width 600px
        </div>
        <div style={{ marginBottom: 20, maxWidth: 600 }}>
          <WidthDisplay />
        </div>

        <div style={{ marginBottom: 10 }}>
          Width 33%, min-width 100px
        </div>
        <div style={{ marginBottom: 20, width: '33%', minWidth: 100 }}>
          <WidthDisplay />
        </div>

        <div style={{ marginBottom: 10 }}>
          Programmatically changing width:{' '}
          <button onClick={this.setRandomWidth}>change</button>{' '}
          <button onClick={survey.resurvey}>resurvey</button>
        </div>
        <div
          style={{
            marginBottom: 20,
            width: this.state.randomWidth,
            maxWidth: '100%'
          }}
        >
          <WidthDisplay />
        </div>
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
