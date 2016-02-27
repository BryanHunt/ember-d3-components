import Ember from 'ember';
import PieLayout from '../utils/layouts/d3-pie-layout';

const { Component } = Ember;

export default Component.extend({
  showDots: true,

  init() {
    this._super.apply(this, arguments);
    let colors = d3.scale.category10();
    this.set('d3layout', PieLayout.create({value: function(dataPoint) {return dataPoint.y;}}));
    this.set('fill', (d, j) => {return colors(j);});
    this.set('data', [{x: 0, y: 10}, {x: 10, y: 20}, {x: 20, y: 35}, {x: 30, y: 45}, {x: 50, y: 65}, {x: 70, y: 95}, {x: 80, y: 97}, {x: 90, y: 100}]);
  }
});
