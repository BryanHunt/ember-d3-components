import Ember from 'ember';
import XYLinePlotter from '../utils/plotters/d3-xy-line-plotter';
import LinearScale from '../utils/scales/d3-linear-scale';

const { Component, observer } = Ember;

export default Component.extend({
  xMax: 100,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: XYLinePlotter.create({
    xScale: LinearScale.create({domain: [0, 100], range: [0, 450]}),
    yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
    data: [
      [{x: 0, y: 10}, {x: 10, y: 20}, {x: 20, y: 35}, {x: 30, y: 45}, {x: 50, y: 65}, {x: 70, y: 95}, {x: 80, y: 97}, {x: 90, y: 100}],
      [{x: 0, y: 20}, {x: 10, y: 40}, {x: 20, y: 55}, {x: 30, y: 65}, {x: 50, y: 65}, {x: 70, y: 105}, {x: 80, y: 107}, {x: 100, y: 100}]
    ]
  }),

  xMaxChanged: observer('xMax', function() {
    this.set('plotter.xScale.domain', [0, this.get('xMax')]);
  }),

  yMaxChanged: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
