import Ember from 'ember';
import BarPlotter from '../utils/d3-bar-plotter';
import OrdinalScale from '../utils/d3-scale-ordinal';
import LinearScale from '../utils/d3-scale-linear';

const { Component, observer } = Ember;

export default Component.extend({
  xMax: 3,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: BarPlotter.create({
    xScale: OrdinalScale.create({domain: [0, 1, 2], rangeBands: [0, 450]}),
    yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
    data: [{x: 0, y: 10}, {x: 1, y: 20}, {x: 2, y:35}],
    width: 450,
    height: 450
  }),

  updateYScale: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
