import Ember from 'ember';

const { Component, on, observer } = Ember;

export default Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],

  init() {
    this.set('axis', d3.svg.axis());
    this._super.apply(this, arguments);
  },

  updateOritntation: on('init', observer('orientation', function() {
    let orientation = this.get('orientation');

    if(orientation) {
      this.get('axis').orient(orientation);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateScale: on('init', observer('scale.scale', function() {
    let scale = this.get('scale.scale');

    if(scale) {
      this.get('axis').scale(scale);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateTicks: on('init', observer('ticks', function() {
    let ticks = this.get('ticks');

    if(ticks) {
      this.get('axis').ticks(ticks);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateTickSubdivide: on('init', observer('tickSubdivide', function() {
    let tickSubdivide = this.get('tickSubdivide');

    if(tickSubdivide) {
      this.get('axis').tickSubdivide(tickSubdivide);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateTickFormat: on('init', observer('tickFormat', function() {
    let tickFormat = this.get('tickFormat');

    if(tickFormat) {
      this.get('axis').tickFormat(tickFormat);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateTickPadding: on('init', observer('tickPadding', function() {
    let tickPadding = this.get('tickPadding');

    if(tickPadding) {
      this.get('axis').tickPadding(tickPadding);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  gridChanged: on('init', observer('grid', function() {
    Ember.run.once(this, this.updateAxis);
  })),

  updateAxis() {
    var id = "#" + this.elementId;
    d3.select(id).transition().call(this.get('axis'));

    if(this.get('grid')) {
      this.updateGrid();
    }
  },

  updateGrid() {
    var id = "#" + this.elementId;
    d3.selectAll(id + " g.tick").select("line.grid-line").remove();

    if(this.get('grid')) {
      var x1 = this.get('grid.x1');
      var x2 = this.get('grid.x2');
      var y1 = this.get('grid.y1');
      var y2 = this.get('grid.y2');

      d3.selectAll(id + " g.tick").append("line").classed("grid-line", true).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
    }
  }
});
