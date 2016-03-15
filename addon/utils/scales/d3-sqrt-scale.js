import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.sqrt());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateScale('rangeRound');
  })),

  exponentChanged: on('init', observer('exponent', function() {
    this.updateScale('exponent');
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
    } else if(nice === false) {
      this.updateScale('domain');
    } else {
      this.updateScale('nice')
    }
  }))
});
