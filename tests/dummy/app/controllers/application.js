import Ember from 'ember';

export default Ember.Controller.extend({
  xScale: d3.scale.linear().domain([0, 100]).range([0, 450]),
  xAxisTransform: "translate(25,475)",
  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),

  yScale: d3.scale.linear().domain([100, 0]).range([0, 450]),
  yAxisTransform: "translate(25,25)",
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0})
});
