import Ember from 'ember';

const { observer, on } = Ember;

export default Ember.Object.extend({
  xScale: null,
  yScale: null,
  svg: null,
  width: null,
  height: null,
  children: null,

  updateSVG: observer('svg', function() {
    var svg = this.get('svg');

    if(svg) {
      this.get('children').forEach((child) => {child.set('svg', svg);});
    }
  }),

  updateXScale: on('init', observer('xScale', function() {
    var xScale = this.get('xScale');

    if(xScale) {
      this.get('children').forEach((child) => {child.set('xScale', xScale);});
    }
  })),

  updateYScale: on('init', observer('yScale', function() {
    var yScale = this.get('yScale');

    if(yScale) {
      this.get('children').forEach((child) => {child.set('yScale', yScale);});
    }
  })),

  updateWidth: on('init', observer('width', function() {
    var width = this.get('width');

    if(width) {
      this.get('children').forEach((child) => {child.set('width', width);});
    }
  })),

  updateHeight: on('init', observer('height', function() {
    var height = this.get('height');

    if(height) {
      this.get('children').forEach((child) => {child.set('height', height);});
    }
  })),
});
