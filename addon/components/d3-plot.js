import Ember from 'ember';
import D3Group from './d3-group';

const { computed, observer } = Ember;

export default D3Group.extend({
  attributeBindings: ['transform', 'clip-path'],

  'clip-path': computed('parentView.clipPath', function() {
    return `url(${window.location.href}${this.get('parentView.clipPath')})`;
  })
});
