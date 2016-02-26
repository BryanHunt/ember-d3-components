import Ember from 'ember';
import OrdinalScale from '../utils/scales/d3-ordinal-scale';
import LinearScale from '../utils/scales/d3-linear-scale';

const { Component, observer } = Ember;

export default Component.extend({
  xMax: 3,
  yMax: 100,

  xAxisTransform: "translate(25,475)",
  yAxisTransform: "translate(25,25)",

  init() {
    this._super.apply(this, arguments);
    this.set('xScale', OrdinalScale.create({domain: ["Apples", "Oranges", "Bananas"], rangeBands: [0, 450], padding: 0.2}));
    this.set('yScale', LinearScale.create({domain: [100, 0], range: [0, 450]}));
    this.set('yScaleDown', LinearScale.create({domain: [0, 100], range: [0, 450]}));

    this.set('xGrid', Ember.Object.create({x1: 0, y1: 0, x2: 0, y2: -450}));
    this.set('yGrid', Ember.Object.create({x1: 0, y1: 0, x2: 450, y2: 0}));
    this.set('data', [{x: "Apples", y: 10}, {x: "Oranges", y: 20}, {x: "Bananas", y:35}]);
    this.set('barWidthTransform', function(dataPoint, scale) {return scale.rangeBand();});
  },

  yMaxChanged: observer('yMax', function() {
    this.set('yScale.domain', [this.get('yMax'), 0]);
    this.set('yScaleDown.domain', [0, this.get('yMax')]);
  })
});
