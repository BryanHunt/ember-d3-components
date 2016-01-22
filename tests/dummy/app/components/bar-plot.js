import Ember from 'ember';
import BarPlotter from '../utils/bar-plotter';

const { Component, Object, observer } = Ember;

export default Component.extend({
  redraw: false,
  xMax: 100,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: BarPlotter.create({
    xScale: d3.scale.linear().domain([0, 3]).range([0, 450]),
    yScale: d3.scale.linear().domain([100, 0]).range([0, 450]),
    data: [{x: 0, y: 10}, {x: 1, y: 20}, {x: 2, y:35}],
    width: 450,
    height: 450
  }),

  updateXScale: observer('xMax', function() {
    this.set('plotter.xScale', d3.scale.linear().domain([0, this.get('xMax')]).range([0, 450]));
  }),

  updateYScale: observer('yMax', function() {
    this.set('plotter.yScale', d3.scale.linear().domain([this.get('yMax'), 0]).range([0, 450]));
  })
});
