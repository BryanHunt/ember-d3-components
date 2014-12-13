import Ember from 'ember';
import XYLinePlotter from '../utils/xy-line-plotter';

export default Ember.Controller.extend({
  redraw: false,
  xMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: XYLinePlotter.create({
    xScale: d3.scale.linear().domain([0, 100]).range([0, 450]),
    yScale: d3.scale.linear().domain([100, 0]).range([0, 450]),
    data: [[{x: 0, y: 10}, {x: 10, y: 20}, {x: 20, y:35}]]
  }),

  updateXScale: function() {
    this.set('plotter.xScale', d3.scale.linear().domain([0, this.get('xMax')]).range([0, 450]));
  }.observes('xMax')
});
