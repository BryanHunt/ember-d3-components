import Ember from 'ember';
import layout from '../templates/components/d3-plot';

const { Component } = Ember;

export default Component.extend({
  tagName: 'g',
  attributeBindings: ['transform', 'clip-path'],

  didInsertElement() {
    this.get('plotter').set('svg', d3.select("#" + this.elementId));
  }
});
