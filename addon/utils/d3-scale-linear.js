import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  domain: null,
  range: null,
  scale: computed('domain', 'range', function() {
    return d3.scale.linear().domain(this.get('domain')).range(this.get('range'));
  })
});
