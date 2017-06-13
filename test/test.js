'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const survey = require('../src/survey');

class Tester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actualWidth: 0 };
    this.actualWidth = this.actualWidth.bind(this);
  }

  componentDidMount() {
    this.actualWidth();
  }

  componentWillReceiveProps() {
    this.actualWidth();
  }

  actualWidth() {
    if (!this.refs.el) return;
    this.setState({ actualWidth: this.refs.el.clientWidth });
  }

  render() {
    const color = this.props.width === this.state.actualWidth ? 'green' : 'red';
    return (
      <div ref="el" style={{ padding: 20, color: '#fff', background: color }}>
        <div>Surveyor says: {this.props.width}</div>
        <div>Actual width: {this.state.actualWidth}</div>
      </div>
    );
  }
}

const SurveyedTester = survey(Tester);

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
          <SurveyedTester />
        </div>

        <div style={{ marginBottom: 10 }}>
          Max-width 600px
        </div>
        <div style={{ marginBottom: 20, maxWidth: 600 }}>
          <SurveyedTester />
        </div>

        <div style={{ marginBottom: 10 }}>
          Width 33%, min-width 100px
        </div>
        <div style={{ marginBottom: 20, width: '33%', minWidth: 100 }}>
          <SurveyedTester />
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
          <SurveyedTester />
        </div>

        <div>
          WrappedComponent works as expected:{' '}
          {SurveyedTester.WrappedComponent === Tester ? 'true' : 'false'}
        </div>
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
