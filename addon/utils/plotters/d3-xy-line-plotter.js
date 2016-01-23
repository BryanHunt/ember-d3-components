import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  init() {
    this.set('line', d3.svg.line());
  },

  xScaleUpdated: on('init', observer('xScale.scale', function() {
    let scale = this.get('xScale.scale');

    if(scale) {
      this.get('line').x((dataPoint) => {return scale(dataPoint.x);});
    }
  })),

  yScaleUpdated: on('init', observer('yScale.scale', function() {
    let scale = this.get('yScale.scale');

    if(scale) {
      this.get('line').y((dataPoint) => {return scale(dataPoint.y);});
    }
  })),

  plot: observer('svg', 'data', function() {
    let svg = this.get('svg');
    let data = this.get('data');

    if(!svg || !data) {
      return;
    }

    let line = this.get('line');

    svg.selectAll("path.line").data(data).enter().append("path").attr("class", "line");
    svg.selectAll("path.line").data(data).attr("d", (dataPoint) => {return line(dataPoint);});
    svg.selectAll("path.line").data(data).exit().remove();
  })
});
