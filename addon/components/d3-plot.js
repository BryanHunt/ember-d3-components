import Ember from 'ember';
//import D3Component from './d3-component';
import D3Group from './d3-group';
import Translatable from '../mixins/translatable';

const { computed, observer } = Ember;

export default D3Group.extend(Translatable, {
  attributeBindings: ['transform', 'clip-path'],
  transform: computed.alias('translation'),

  'clip-path': computed('parentView.clipPath', function() {
    return `url(${this.get('parentView.clipPath')})`;
  })
});
