import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'clipPath',

  didInsertElement() {
    this.set('parentView.clipPath', this.elementId);
  }
});
