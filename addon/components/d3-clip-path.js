import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'clipPath',

  didInsertElement() {
    Ember.run.next(this, function() {
      this.set('parentView.clipPath', "#" + this.elementId);
    });
  }
});
