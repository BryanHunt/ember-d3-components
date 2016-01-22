import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  domain: null,
  range: null,
  scale: computed('domain', 'range', function() {
    var scale = d3.scale.linear();
    let domain = this.get('domain');
    let range = this.get('range');

    if(domain) {
      scale = scale.domain(domain);
    }

    if(range) {
      scale = scale.range(range);
    }

    return scale;
  })
});
