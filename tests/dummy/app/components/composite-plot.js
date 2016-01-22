import Ember from 'ember';
import BarPlotter from '../utils/d3-bar-plotter';
import XYLinePlotter from '../utils/d3-xy-line-plotter';
import CompositePlotter from '../utils/d3-composite-plotter';
import LinearScale from '../utils/d3-scale-linear';

const { Component, observer } = Ember;

export default Component.extend({
  redraw: false,
  xMax: 100,
  yMax: 100,
  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: CompositePlotter.create({
    xScale: LinearScale.create({domain: [0, 3], range: [0, 450]}),
    yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
    width: 450,
    height: 450,
    children: [
      BarPlotter.create({ data: [{x: 0, y: 10}, {x: 1, y: 20}, {x: 2, y:35}]  }),
      XYLinePlotter.create({ data: [[{x: 0, y: 10}, {x: 1, y: 20}, {x: 2, y:35}]] })
    ]}),

  updateXScale: observer('xMax', function() {
    this.set('plotter.xScale.domain', [0, this.get('xMax')]);
  }),

  updateYScale: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
