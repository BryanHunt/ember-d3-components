import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  init() {
    this.set('scale', d3.scale.linear());
  },

  domainChanged: on('init', observer('domain', function() {
    let domain = this.get('domain');

    if(domain) {
      this.get('scale').domain(domain);
    }
  })),

  rangeChanged: on('init', observer('range', function() {
    let range = this.get('range');

    if(range) {
      this.get('scale').range(range);
    }
  })),

  rangeRoundChanged: on('init', observer('rangeRound', function() {
    let rangeRound = this.get('rangeRound');

    if(rangeRound) {
      this.get('scale').rangeRound(rangeRound);
    }
  })),

  interpolateChanged: on('init', observer('interpolate', function() {
    let interpolate = this.get('interpolate');

    if(interpolate) {
      this.get('scale').interpolate(interpolate);
    }
  })),

  clampChanged: on('init', observer('clamp', function() {
    let clamp = this.get('clamp');

    if(clamp) {
      this.get('scale').clamp(clamp);
    }
  })),

  niceChanged: on('init', observer('nice', function() {
    let nice = this.get('nice');

    if(nice) {
      this.get('scale').nice(nice);
    }
  }))
});
