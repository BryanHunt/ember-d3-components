import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.log());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateProperty('scale', 'rangeRound');
  })),

  baseChanged: on('init', observer('base', function() {
    this.updateProperty('scale', 'base');
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    this.updateProperty('scale', 'interpolate');
  })),

  clampChanged: on('init', observer('clamp', function() {
    this.updateProperty('scale', 'clamp');
  })),

  niceChanged: on('init', observer('nice', function() {
    let nice = this.get('nice');

    if(nice === undefined || nice === null)
      return;

    if(nice === true) {
      this.get('scale').nice();
      Ember.run.next(this, 'notifyPropertyChange', 'scale');
    } else {
      this.updateProperty('scale', 'domain');
    }
  }))
});
