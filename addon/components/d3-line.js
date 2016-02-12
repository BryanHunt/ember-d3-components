import Ember from 'ember';
import D3Group from './d3-group';

const { on, observer } = Ember;

export default D3Group.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('line', d3.svg.line());
  },

  propertiesUpdated: observer('d3Selection', 'data', function() {
    Ember.run.once(this, 'plot');
  }),

  xScaleUpdated: on('init', observer('xScale', function() {
    let scale = this.get('xScale.scale');

    if(scale) {
      this.get('line').x((dataPoint) => {return scale(dataPoint.x);});
      Ember.run.once(this, 'plot');
    }
  })),

  yScaleUpdated: on('init', observer('yScale', function() {
    let scale = this.get('yScale.scale');

    if(scale) {
      this.get('line').y((dataPoint) => {return scale(dataPoint.y);});
      Ember.run.once(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = [this.get('data')];
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');

    if(!d3Selection || !data || !xScale || !yScale) {
      return;
    }

    let line = this.get('line');
    let d3data = d3Selection.selectAll("path.line").data(data);

    d3data.enter().append("path").attr("class", "line");
    d3data.attr("d", (dataPoint) => {return line(dataPoint);});
    d3data.exit().remove();
  }
});
