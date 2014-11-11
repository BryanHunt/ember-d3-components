import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'path',

  didInsertElement: function() {
    this.get('render')("Hello");
  }
});
