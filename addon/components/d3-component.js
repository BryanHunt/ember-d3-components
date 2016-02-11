import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didInsertElement() {
    this.set('d3Selection', d3.select("#" + this.elementId));
  }
});
