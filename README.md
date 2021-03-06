# Ember D3 Components
[![Build Status](https://travis-ci.org/BryanHunt/ember-d3-components.svg?branch=master)](https://travis-ci.org/BryanHunt/ember-d3-components)

This addon provides EmberJS components for visualizing data with d3.js.

See it in action: http://bryanhunt.github.io/#/d3components

There are examples in the dummy app that show how to use the components.

The util API seems to be much more consistent now, so I don't see it changing much.  I'll try to solidify the component API next.  I hope that future changes will simply be adding functionality.  All of the objects in util now have significant unit tests.

Things that seem to be working:
* Scales
* Axis
* Grid
* Text
* Line
* Arc
* Area
* Bar
* Circle
* Pie Layout
* Stack Layout

If you need to create charts, I would recommend checking out: https://github.com/BryanHunt/ember-d3-charts

If you have questions, you can generally find me on Slack in the EmberJS Community.

This is a fairly significant undertaking and I would welcome additional contributors.

## Installation

* ember install ember-d3-components

## Contributing

* `git clone` this repository
* `npm install`
* `bower install`

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
