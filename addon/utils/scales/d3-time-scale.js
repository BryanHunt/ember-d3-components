import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.time.scale());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateProperty('scale', 'rangeRound');
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    this.updateProperty('scale', 'interpolate');
  })),

  clampChanged: on('init', observer('clamp', function() {
    this.updateProperty('scale', 'clamp');
  }))
});
