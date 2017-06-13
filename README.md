# react-simple-surveyor

Simple higher-order React component for measuring a component's available width.

![Simple surveyors](https://nationalmap.gov/ustopo/images/old_survey_team.jpg)

## Usage

```jsx
const survey = require('react-simple-surveyor');

function Original(props) {
  // The wrapped component receives a `width` prop,
  // telling it how much width is available to it.
  return <div>Available width: {props.width}px.</div>;
}

const Surveyed = survey(Original);

// When the window is resized, the width is resurveyed.
// You can also trigger a resurvey manually, on all surveyed components,
// when there are layout changes without a resize.
survey.resurvey();

// All props provided to `Surveyed` will be passed along
// to `Original`.
<Surveyed className="green" aria-label="green box" title="Green!" />;

// The wrapped component (`Original`) is available
// on the `WrappedComponent` static property of the returned
// React component class.
Surveyed.WrappedComponent === Original;
```

## Details and caveats

- Built for block-level elements, since those are the ones whose width is determined by their container.
  Wraps your component in a `<div>`.
- Upon mounting, initially renders an empty `<div>`.
  This makes no perceptible difference for the user, but might affect some other complicated stuff you have going on.
- There are lots of other modules that do similar things: react-measure, react-dimensions, react-measure-it, react-with-dimension, etc. 
  The closest to this module's simplicity is react-with-available-width.
  If this module doesn't suit your needs, you might try one of the others.

## Development

The most efficient way to test this module is with a quick manual test.
So `npm start` or `npm test` both start a development server that shows a page of test cases.
Check these before you commit changes.
Add more test cases as needed.

Probably this module will hardly change at all.
