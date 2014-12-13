import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],

  didInsertElement: function() {
    this.set('axis', d3.svg.axis());

    if(this.get('orientation'))
      this.updateOritntation();

    if(this.get('scale'))
      this.updateScale();

    if(this.get('ticks'))
      this.updateTicks();

    if(this.get('tickSubdivide'))
      this.updateTickSubdivide();

    if(this.get('tickFormat'))
      this.updateTickFormat();

    if(this.get('tickPadding'))
      this.updateTickPadding();

    Ember.run.once(this, this.updateAxis);
  },

  updateOritntation: function() {
    this.get('axis').orient(this.get('orientation'))
    Ember.run.once(this, this.updateAxis);
  }.observes('orientation'),

  updateScale: function() {
    this.get('axis').scale(this.get('scale'))
    Ember.run.once(this, this.updateAxis);
  }.observes('scale'),

  updateTicks: function() {
    this.get('axis').ticks(this.get('ticks'))
    Ember.run.once(this, this.updateAxis);
  },

  updateTickSubdivide: function() {
    this.get('axis').tickSubdivide(this.get('tickSubdivide'))
    Ember.run.once(this, this.updateAxis);
  },

  updateTickFormat: function() {
    this.get('axis').tickFormat(this.get('tickFormat'))
    Ember.run.once(this, this.updateAxis);
  },

  updateTickPadding: function() {
    this.get('axis').tickPadding(this.get('tickPadding'))
    Ember.run.once(this, this.updateAxis);
  },

  updateAxis: function() {
    var id = "#" + this.elementId;
    d3.select(id).transition().call(this.get('axis'));

    if(this.get('grid'))
      this.updateGrid();
  },

  updateGrid: function() {
    d3.selectAll(id + " g.tick").select("line.grid-line").remove();

    if(this.get('grid'))
    {
      var x1 = this.get('grid.x1');
      var x2 = this.get('grid.x2');
      var y1 = this.get('grid.y1');
      var y2 = this.get('grid.y2');

      var id = "#" + this.elementId;
      d3.selectAll(id + " g.tick").append("line").classed("grid-line", true).attr("x1", x1). attr("y1", y1).attr("x2", x2).attr("y2", y2);    
    }
  }.observes('grid')
});
