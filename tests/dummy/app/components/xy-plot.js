import Ember from 'ember';
import XYLinePlotter from '../utils/xy-line-plotter';

const { Component, Object, observer } = Ember;

export default Component.extend({
  redraw: false,
  xMax: 100,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: XYLinePlotter.create({
    xScale: d3.scale.linear().domain([0, 100]).range([0, 450]),
    yScale: d3.scale.linear().domain([100, 0]).range([0, 450]),
    data: [[{x: 0, y: 10}, {x: 10, y: 20}, {x: 20, y:35}, {x: 30, y:45}, {x: 50, y:65}, {x: 70, y:95}, {x: 80, y:97}, {x: 90, y:100} ]]
  }),

  updateXScale: observer('xMax', function() {
    this.set('plotter.xScale', d3.scale.linear().domain([0, this.get('xMax')]).range([0, 450]));
  }),

  updateYScale: observer('yMax', function() {
    this.set('plotter.yScale', d3.scale.linear().domain([this.get('yMax'), 0]).range([0, 450]));
  })
});
