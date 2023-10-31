'use strict';

const React = require('react');
const debounce = require('debounce');

// Accumulate resize listeners and run them all as part of the resize handler.
// This way we only attach one actual event listener.
const resizeListeners = [];
const invokeResizeListeners = () => {
  resizeListeners.forEach((listener) => listener());
};

let initialized = false;
function initializeListener() {
  if (initialized || typeof window == 'undefined') return;
  initialized = true;
  const onResize = debounce(invokeResizeListeners, 300);
  window.addEventListener('resize', onResize, false);
}

function survey(WrappedComponent) {
  initializeListener();

  class Surveyed extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.updateWidth = this.updateWidth.bind(this);
      this.setContainerElement = this.setContainerElement.bind(this);
      resizeListeners.push(this.updateWidth);
    }

    componentDidMount() {
      this.updateWidth();
    }

    componentWillUnmount() {
      resizeListeners.splice(resizeListeners.indexOf(this.updateWidth), 1);
    }

    updateWidth() {
      if (!this.container) return;
      const nextWidth = this.container.clientWidth;
      if (this.state.width !== nextWidth) {
        this.setState({ width: nextWidth });
      }
    }

    setContainerElement(element) {
      this.container = element;
    }

    render() {
      let innards = null;
      if (this.state.width !== undefined) {
        innards = <WrappedComponent {...this.props} width={this.state.width} />;
      }

      return <div ref={this.setContainerElement}>{innards}</div>;
    }
  }

  Surveyed.WrappedComponent = WrappedComponent;
  return Surveyed;
}

survey.resurvey = invokeResizeListeners;

module.exports = survey;
