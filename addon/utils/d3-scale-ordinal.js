import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  domain: null,
  range: null,
  scale: computed('domain', 'rangeBands', function() {
    var scale = d3.scale.ordinal();
    let domain = this.get('domain');
    let rangeBands = this.get('rangeBands');

    if(domain) {
      scale = scale.domain(domain);
    }

    if(rangeBands) {
      scale = scale.rangeBands(rangeBands);
    }

    return scale;
  })
});
