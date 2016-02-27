import Ember from 'ember';
import D3Group from './d3-group';

const { on, observer } = Ember;

export default D3Group.extend({
  dataX: "x",
  dataY0: "y",
  dataY1: "y",

  init() {
    this._super.apply(this, arguments);
    this.set('area', d3.svg.area());
  },

  propertiesUpdated: observer('d3Selection', 'data', function() {
    Ember.run.once(this, 'plot');
  }),

  xScaleUpdated: on('init', observer('xScale', 'xScale.scale', function() {
    let scale = this.get('xScale.scale');
    let dataX = this.get('dataX');

    if(scale) {
      this.get('area').x((dataPoint) => {return scale(dataPoint[dataX]);});
      Ember.run.once(this, 'plot');
    }
  })),

  y0ScaleUpdated: on('init', observer('y0Scale', 'y0Scale.scale', function() {
    let scale = this.get('y0Scale.scale');
    let dataY = this.get('dataY0');

    if(scale) {
      this.get('area').y0((dataPoint) => {return scale(dataPoint[dataY]);});
      Ember.run.once(this, 'plot');
    }
  })),

  y1ScaleUpdated: on('init', observer('y1Scale', 'y1Scale.scale', function() {
    let scale = this.get('y1Scale.scale');
    let dataY = this.get('dataY1');

    if(scale) {
      this.get('area').y1((dataPoint) => {return scale(dataPoint[dataY]);});
      Ember.run.once(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let y0Scale = this.get('y0Scale');
    let y1Scale = this.get('y1Scale');

    if(!d3Selection || !data || !xScale || !y0Scale || !y1Scale) {
      return;
    }

    if(!(data[0] instanceof Array)) {
      data = [data];
    }

    let area = this.get('area');
    let d3data = d3Selection.selectAll("path.area").data(data);

    d3data.enter().append("path").attr("class", "area");
    d3data.transition().attr("d", (dataPoint) => {return area(dataPoint);});
    d3data.exit().remove();
  }
});
