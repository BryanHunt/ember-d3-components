import Ember from 'ember';
import BarPlotter from '../utils/plotters/d3-bar-plotter';
import OrdinalScale from '../utils/scales/d3-ordinal-scale';
import LinearScale from '../utils/scales/d3-linear-scale';

const { Component, observer } = Ember;

export default Component.extend({
  xMax: 3,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  xGrid: Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}),
  yGrid: Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}),

  init() {
    this._super.apply(this, arguments);
    this.set('plotters', Ember.A());

    let plotter = BarPlotter.create({
      xScale: OrdinalScale.create({domain: ["Apples", "Oranges", "Bananas"], rangeBands: [0, 450], padding: 0.2}),
      yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
      data: [{x: "Apples", y: 10}, {x: "Oranges", y: 20}, {x: "Bananas", y:35}],
      width: 450,
      height: 450,
      barWidthTransform: function(dataPoint, xScale) {return xScale.rangeBand();}
    });

    this.get('plotters').pushObject(plotter);
  },

  yMaxChanged: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
