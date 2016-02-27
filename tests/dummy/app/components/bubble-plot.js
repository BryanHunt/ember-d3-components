import Ember from 'ember';
import LinearScale from '../utils/scales/d3-linear-scale';

const { Component, observer } = Ember;

export default Component.extend({
  showDots: true,

  init() {
    this._super.apply(this, arguments);
    let colors = d3.scale.category10();
    this.set('xMax', 100);
    this.set('yMax', 100);
    this.set('data', [{x: 0, y: 10, r: 5}, {x: 10, y: 20, r: 7}, {x: 20, y: 65, r: 2}, {x: 30, y: 35, r: 0}, {x: 50, y: 25, r: 5}, {x: 70, y: 55, r: 6}, {x: 80, y: 17, r: 9}, {x: 90, y: 40, r: 4}]);
    this.set('xScale', LinearScale.create({domain: [0, 100], range: [0, 450]}));
    this.set('yScale', LinearScale.create({domain: [100, 0], range: [0, 450]}));
    this.set('rScale', LinearScale.create({domain: [0, 10], range: [10, 40]}));
    this.set('fill', (d, j) => {return colors(j);});
    this.set('stroke', (d, j) => {return colors(j);});
  },

  xMaxChanged: observer('xMax', function() {
    this.set('xScale.domain', [0, this.get('xMax')]);
  }),

  yMaxChanged: observer('yMax', function() {
    this.set('yScale.domain', [this.get('yMax'), 0]);
  })
});
