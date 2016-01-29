import Ember from 'ember';
import Translatable from '../mixins/translatable';

const { Component, computed } = Ember;

export default Component.extend(Translatable, {
  tagName: 'g',
  attributeBindings: ['transform', 'clip-path'],

  didInsertElement() {
    this.get('plotter').set('svg', d3.select("#" + this.elementId));
  },

  transform: computed.alias('translation'),
});
