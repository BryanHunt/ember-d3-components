import Ember from 'ember';

const { observer, on } = Ember;

export default Ember.Object.extend({
  updateSVG: on('init', observer('svg', 'children', function() {
    let svg = this.get('svg');
    let children = this.get('children');

    if(svg && children) {
      children.forEach((child) => {child.set('svg', svg);});
    }
  })),

  updateXScale: on('init', observer('xScale.scale', 'children', function() {
    let xScale = this.get('xScale');
    let children = this.get('children');

    if(xScale && children) {
      children.forEach((child) => {child.set('xScale', xScale);});
    }
  })),

  updateYScale: on('init', observer('yScale.scale', 'children', function() {
    let yScale = this.get('yScale');
    let children = this.get('children');

    if(yScale && children) {
      children.forEach((child) => {child.set('yScale', yScale);});
    }
  })),

  updateWidth: on('init', observer('width', 'children', function() {
    let width = this.get('width');
    let children = this.get('children');

    if(width && children) {
      children.forEach((child) => {child.set('width', width);});
    }
  })),

  updateHeight: on('init', observer('height', 'children', function() {
    let height = this.get('height');
    let children = this.get('children');

    if(height && children) {
      children.forEach((child) => {child.set('height', height);});
    }
  })),
});
