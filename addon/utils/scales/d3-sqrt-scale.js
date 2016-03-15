import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.sqrt());
  },

  rangeRoundChanged: on('init', observer('rangeRound.[]', function() {
    this.updateProperty('scale', 'rangeRound');
  })),

  exponentChanged: on('init', observer('exponent', function() {
    this.updateProperty('scale', 'exponent');
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
    } else if(nice === false) {
      this.updateProperty('scale', 'domain');
    } else {
      this.updateProperty('scale', 'nice')
    }
  }))
});
