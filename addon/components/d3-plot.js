import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'g',
  attributeBindings: ['transform', 'clip-path'],

  didInsertElement() {
    this.get('plotter').set('svg', d3.select("#" + this.elementId));
  }
});
