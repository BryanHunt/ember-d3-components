import Ember from 'ember';
import D3Group from './d3-group';

const { on, observer } = Ember;

export default D3Group.extend({
  dataX: "x",
  dataY: "y",

  init() {
    this._super(...arguments);
    this.set('line', d3.svg.line());
  },

  propertiesUpdated: observer('d3Selection', 'data', function() {
    Ember.run.once(this, 'plot');
  }),

  xScaleUpdated: on('init', observer('xScale', 'xScale.scale', function() {
    let scale = this.get('xScale.scale');
    let dataX = this.get('dataX');

    if(scale) {
      this.get('line').x((dataPoint) => {return scale(dataPoint[dataX]);});
      Ember.run.once(this, 'plot');
    }
  })),

  yScaleUpdated: on('init', observer('yScale', 'yScale.scale', function() {
    let scale = this.get('yScale.scale');
    let dataY = this.get('dataY');

    if(scale) {
      this.get('line').y((dataPoint) => {return scale(dataPoint[dataY]);});
      Ember.run.once(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');

    if(!d3Selection || !data || !xScale || !yScale) {
      return;
    }

    if(!(data[0] instanceof Array)) {
      data = [data];
    }

    let line = this.get('line');
    let d3data = d3Selection.selectAll("path.line").data(data);

    d3data.enter().append("path").attr("class", "line");
    d3data.transition().attr("d", (dataPoint) => {return line(dataPoint);});
    d3data.exit().remove();
  }
});
