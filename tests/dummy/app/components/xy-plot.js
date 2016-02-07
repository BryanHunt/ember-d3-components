import Ember from 'ember';
import XYLinePlotter from '../utils/plotters/d3-xy-line-plotter';
import LinearScale from '../utils/scales/d3-linear-scale';

const { Component, observer } = Ember;

export default Component.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('xMax', 100);
    this.set('yMax', 100);
    this.set('plotters', Ember.A());

    let plotter = XYLinePlotter.create({
      xScale: LinearScale.create({domain: [0, 100], range: [0, 450]}),
      yScale: LinearScale.create({domain: [100, 0], range: [0, 450]}),
      data: [[{x: 0, y: 10}, {x: 10, y: 20}, {x: 20, y: 35}, {x: 30, y: 45}, {x: 50, y: 65}, {x: 70, y: 95}, {x: 80, y: 97}, {x: 90, y: 100}]]
    });

    this.get('plotters').pushObject(plotter);
  },

  xMaxChanged: observer('xMax', function() {
    this.set('plotter.xScale.domain', [0, this.get('xMax')]);
  }),

  yMaxChanged: observer('yMax', function() {
    this.set('plotter.yScale.domain', [this.get('yMax'), 0]);
  })
});
