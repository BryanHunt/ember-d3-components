export default Ember.Object.extend({
  xScale: null,
  yScale: null,
  svg: null,
  width: null,
  height: null,
  children: null,

  updateSVG: function() {
    var svg = this.get('svg');

    if(!svg)
      return;

    this.get('children').forEach(function(child) {child.set('svg', svg);});
  }.observes('svg'),

  updateXScale: function() {
    var xScale = this.get('xScale');

    if(!xScale)
      return;

    this.get('children').forEach(function(child) {child.set('xScale', xScale);});
  }.observes('xScale').on('init'),

  updateYScale: function() {
    var yScale = this.get('yScale');

    if(!yScale)
      return;

    this.get('children').forEach(function(child) {child.set('yScale', yScale);});
  }.observes('yScale').on('init'),

  updateWidth: function() {
    var width = this.get('width');

    if(!width)
        return;

    this.get('children').forEach(function(child) {child.set('width', width);});
  }.observes('width').on('init'),

  updateHeight: function() {
    var height = this.get('height');

    if(!height)
      return;

    this.get('children').forEach(function(child) {child.set('height', height);});
  }.observes('height').on('init'),
});
