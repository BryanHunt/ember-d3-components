import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  init() {
    this.set('line', d3.svg.line());
  },

  destroy() {
    let svg = this.get('svg');

    if(svg) {
      svg.selectAll("path.line").remove();
    }

    return this._super.destroy();
  },

  svgUpdated: on('init', observer('svg', function() {
    Ember.run.once(this, 'plot');
  })),

  dataUpdated: on('init', observer('data', function() {
    Ember.run.once(this, 'plot');
  })),

  xScaleUpdated: on('init', observer('xScale', 'xScale.scale', function() {
    let scale = this.get('xScale.scale');

    if(scale) {
      this.get('line').x((dataPoint) => {return scale(dataPoint.x);});
      Ember.run.once(this, 'plot');
    }
  })),

  yScaleUpdated: on('init', observer('yScale', 'yScale.scale', function() {
    let scale = this.get('yScale.scale');

    if(scale) {
      this.get('line').y((dataPoint) => {return scale(dataPoint.y);});
      Ember.run.once(this, 'plot');
    }
  })),

  plot() {
    let svg = this.get('svg');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');

    if(!svg || !data || !xScale || !yScale) {
      return;
    }

    let line = this.get('line');

    svg.selectAll("path.line").data(data).enter().append("path").attr("class", "line");
    svg.selectAll("path.line").data(data).attr("d", (dataPoint) => {return line(dataPoint);});
    svg.selectAll("path.line").data(data).exit().remove();
  }
});
