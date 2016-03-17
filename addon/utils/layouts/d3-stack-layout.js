import Ember from 'ember';
import PropertyUpdater from '../../mixins/d3-property-updater';

const { on, observer } = Ember;

export default Ember.Object.extend(PropertyUpdater, {
  init() {
    this.set('layout', d3.layout.stack());
  },

  valuesChanged: on('init', observer('values', function() {
    this.updateProperty('layout', 'values');
  })),

  offsetChanged: on('init', observer('offset', function() {
    this.updateProperty('layout', 'offset');
  })),

  orderChanged: on('init', observer('order', function() {
    this.updateProperty('layout', 'order');
  })),

  xChanged: on('init', observer('x', function() {
    this.updateProperty('layout', 'x');
  })),

  yChanged: on('init', observer('y', function() {
    this.updateProperty('layout', 'y');
  })),

  outChanged: on('init', observer('out', function() {
    this.updateProperty('layout', 'out');
  }))
});
