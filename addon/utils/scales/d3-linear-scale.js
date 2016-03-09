import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.linear());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateScale('rangeRound');
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    this.updateScale('interpolate');
  })),

  clampChanged: on('init', observer('clamp', function() {
    this.updateScale('clamp')
  })),

  niceChanged: on('init', observer('nice', function() {
    let nice = this.get('nice');

    if(nice) {
      this.get('scale').nice();
      Ember.run.next(this, 'notifyPropertyChange', 'scale');
    }
  })),

  niceTickCountChanged: on('init', observer('niceTickCount', function() {
    this.updateScale('niceTickCount', 'nice')
  }))
});
