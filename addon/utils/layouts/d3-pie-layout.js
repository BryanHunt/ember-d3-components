import Ember from 'ember';
import PropertyUpdater from '../../mixins/d3-property-updater';

const { on, observer } = Ember;

export default Ember.Object.extend(PropertyUpdater, {
  init() {
    this.set('layout', d3.layout.pie());
  },

  valueChanged: on('init', observer('value', function() {
    this.updateProperty('layout', 'value');
  })),

  sortChanged: on('init', observer('sort', function() {
    this.updateProperty('layout', 'sort');
  })),

  startAngleChanged: on('init', observer('startAngle', function() {
    this.updateProperty('layout', 'startAngle');
  })),

  endAngleChanged: on('init', observer('endAngle', function() {
    this.updateProperty('layout', 'endAngle');
  })),

  padAngleChanged: on('init', observer('padAngle', function() {
    this.updateProperty('layout', 'padAngle');
  })),
});
