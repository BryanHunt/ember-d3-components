import Ember from 'ember';
import Translatable from '../mixins/translatable';

const { Component, computed, observer } = Ember;

export default Component.extend(Translatable, {
  tagName: 'g',
  attributeBindings: ['transform', 'clip-path'],

  didInsertElement() {
    this.set('svg', d3.select("#" + this.elementId));
    Ember.run.once(this, 'updatePlotters')
  },

  plottersChanged: observer('plotters.[]', function() {
    Ember.run.once(this, 'updatePlotters');
  }),

  transform: computed.alias('translation'),

  'clip-path': computed('parentView.clipPath', function() {
    return `url(${this.get('parentView.clipPath')})`;
  }),

  updatePlotters() {
    let svg = this.get('svg');
    let plotters = this.get('plotters');

    if(svg && plotters) {
      plotters.forEach((plotter) => {
        plotter.set('svg', svg);
      });
    }
  }
});
