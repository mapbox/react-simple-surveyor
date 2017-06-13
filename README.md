# react-simple-surveyor

Simple higher-order React component for measuring a component's available width.

![Simple surveyors](https://nationalmap.gov/ustopo/images/old_survey_team.jpg)

## Usage

```jsx
const survey = require('react-simple-surveyor');

const SurveyedComponent = survey(function OriginalComponent(props) {
  return (
    <div>
      This components has an available width of {props.width}px.
    </div>
  );
});

// Automatically resurveys the width when the window is resized.
// Or you can resurvey manually when there are layout changes without a resize.
survey.resurvey();
```

The wrapped component (`OriginalComponent`) receives a `width` prop, telling it how much width is available to it.

When the window is resized, the width is resurveyed.
You can also trigger a resurvey programmatically on all surveyed components by calling `survey.resurvey()`.

All props provided to `SurveyedComponent` will be passed along to `OriginalComponent`.

The wrapped component (`OriginalComponent`) is available on the `WrappedComponent` static property of the returned React component class (`SurveyedComponent.WrappedComponent`).

## Details and caveats

- Built for block-level elements, since those are the ones whose width is determined by their container.
  Wraps your component in a `<div>`.
- Upon mounting, initially renders an empty `<div>`.
  This makes no perceptible difference for the user, but might affect some other complicated stuff you have going on.

## Development

The most efficient way to test this module is with a quick manual test.
So `npm start` or `npm test` both start a development server that shows a page of test cases.
Check these before you commit changes.
Add more test cases as needed.

Probably this module will hardly change at all.
