# @mapbox/react-simple-surveyor

Simple higher-order React component for simple measurements of a component's available width.

![simple surveyor](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Land_surveyor.jpg/640px-Land_surveyor.jpg)

## Usage

```jsx
const survey = require('@mapbox/react-simple-surveyor');

function Original(props) {
  // The wrapped component receives a `width` prop,
  // telling it how much width is available to it.
  return <div>Available width: {props.width}px.</div>;
}

const Surveyed = survey(Original);

// When the window is resized, the width is resurveyed.
// You can also trigger a resurvey manually, on all surveyed components,
// when there are programmatic layout changes.
survey.resurvey();

// All props provided to `Surveyed` will be passed along
// to your `Original` component.
<Surveyed className="green" aria-label="green box" title="Green!" />;

// Your `Original` component is available on the
// `WrappedComponent` static property of the returned
// React component class.
Surveyed.WrappedComponent === Original;
```

## Details and caveats

- Built for block-level elements, since those are the ones whose width is determined by their container.
  *Wraps your component in a `<div>`.*
- Upon mounting, initially renders an empty `<div>`.
  This makes no perceptible difference for the user, but might affect some other complicated stuff you have going on.

## Why use this instead of the many other dimension-measuring higher-order components?

There are lots of other modules that do similar things: react-measure, react-dimensions, react-measure-it, react-with-dimension, react-container-dimensions, react-element-queries, react-element-query, etc.

This module's goal is to provide the smallest and simplest way to measure the available width.
Pretty much all of the other modules I've found are larger and more ambitious.
The fundamental problems of measuring are not super difficult, so I think that a variety of modules with different APIs are kind of inevitable.

The closest I've found to this module's simplicity is react-with-available-width.

If this module doesn't suit your needs, you should try one of the others!

## Development

The most efficient way to test this module is with a quick manual review.
So `npm start` or `npm test` both start a development server that shows a page of test cases.
Check these before you commit changes.
Add more test cases as needed.
