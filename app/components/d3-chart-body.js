import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'g',
  attributeBindings: ['transform', 'clip-path'],

  didInsertElement: function() {
    this.get('plot')(d3.select("#" + this.elementId));
  }
});
