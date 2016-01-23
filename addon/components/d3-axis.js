import Ember from 'ember';

const { Component, on, observer } = Ember;

export default Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],

  init() {
    this.set('axis', d3.svg.axis());
    this._super.apply(this, arguments);
  },

  oritntationChanged: on('init', observer('orientation', function() {
    let orientation = this.get('orientation');

    if(orientation) {
      this.get('axis').orient(orientation);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  scaleChanged: on('init', observer('scale.scale', function() {
    let scale = this.get('scale.scale');

    if(scale) {
      this.get('axis').scale(scale);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  ticksChanged: on('init', observer('ticks', function() {
    let ticks = this.get('ticks');

    if(ticks) {
      this.get('axis').ticks(ticks);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickValuesChanged: on('init', observer('tickValues', function() {
    let tickValues = this.get('tickValues');

    if(tickValues) {
      this.get('axis').tickValues(tickValues);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickSizeChanged: on('init', observer('tickSize', function() {
    let tickSize = this.get('tickSize');

    if(tickSize) {
      this.get('axis').tickSize(tickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  innerTickSizeChanged: on('init', observer('innerTickSize', function() {
    let innerTickSize = this.get('innerTickSize');

    if(innerTickSize) {
      this.get('axis').innerTickSize(innerTickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  outerTickSizeChanged: on('init', observer('outerTickSize', function() {
    let outerTickSize = this.get('outerTickSize');

    if(outerTickSize) {
      this.get('axis').outerTickSize(outerTickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickFormatChanged: on('init', observer('tickFormat', function() {
    let tickFormat = this.get('tickFormat');

    if(tickFormat) {
      this.get('axis').tickFormat(tickFormat);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickPaddingChanged: on('init', observer('tickPadding', function() {
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
      d3.selectAll(id + " g.tick").select("line.grid-line").remove();
      let x1 = this.get('grid.x1');
      let x2 = this.get('grid.x2');
      let y1 = this.get('grid.y1');
      let y2 = this.get('grid.y2');
      d3.selectAll(id + " g.tick").append("line").classed("grid-line", true).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
    }
  }
});
