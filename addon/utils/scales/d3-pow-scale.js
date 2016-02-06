import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.pow());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    let rangeRound = this.get('rangeRound');

    if(rangeRound) {
      this.get('scale').rangeRound(rangeRound);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  exponentChanged: on('init', observer('exponent', function() {
    let exponent = this.get('exponent');

    if(exponent) {
      this.get('scale').exponent(exponent);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    let interpolate = this.get('interpolate');

    if(interpolate) {
      this.get('scale').interpolate(interpolate);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  clampChanged: on('init', observer('clamp', function() {
    let clamp = this.get('clamp');

    if(clamp !== undefined && clamp !== null) {
      this.get('scale').clamp(clamp);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  }))
});
