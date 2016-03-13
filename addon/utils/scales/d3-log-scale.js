import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.log());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateScale('rangeRound');
  })),

  baseChanged: on('init', observer('base', function() {
    this.updateScale('base');
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    this.updateScale('interpolate');
  })),

  clampChanged: on('init', observer('clamp', function() {
    this.updateScale('clamp');
  })),

  niceChanged: on('init', observer('nice', function() {
    let nice = this.get('nice');

    if(nice === undefined || nice === null)
      return;

    if(nice === true) {
      this.get('scale').nice();
      Ember.run.next(this, 'notifyPropertyChange', 'scale');
    } else {
      this.updateScale('domain');
    }
  }))
});
