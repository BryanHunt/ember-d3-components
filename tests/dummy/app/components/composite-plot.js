import Ember from 'ember';
import BarPlotter from '../utils/plotters/d3-bar-plotter';
import XYLinePlotter from '../utils/plotters/d3-xy-line-plotter';
import CompositePlotter from '../utils/plotters/d3-composite-plotter';
import LinearScale from '../utils/scales/d3-linear-scale';
import OrdinalScale from '../utils/scales/d3-ordinal-scale';

const { Component, observer } = Ember;

export default Component.extend({
  xMax: 100,
  yMax: 100,
  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  plotter: CompositePlotter.create({
    xScale: OrdinalScale.create({domain: ["Apples", "Oranges", "Bananas"], rangeBands: [0, 450]}),
    yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
    width: 450,
    height: 450,
    children: [
      BarPlotter.create({ data: [{x: "Apples", y: 10}, {x: "Oranges", y: 20}, {x: "Bananas", y:35}]  }),
      XYLinePlotter.create({ data: [[{x: "Apples", y: 20}, {x: "Oranges", y: 40}, {x: "Bananas", y:80}]] })
    ]}),

  xMaxChanged: observer('xMax', function() {
    this.set('plotter.xScale.domain', [0, this.get('xMax')]);
  }),

  yMaxChanged: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
