import Ember from 'ember';
import D3Group from './d3-group';
import Accessor from '../utils/accessor';

const { on, observer } = Ember;

export default D3Group.extend({
  init() {
    this._super(...arguments);
    this.line = d3.svg.line();
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.yAccessor = this.yAccessor || Accessor.create({name: "y"});
  },

  propertiesUpdated: observer('d3Selection', 'data', function() {
    Ember.run.next(this, 'plot');
  }),

  xScaleUpdated: on('init', observer('xScale', 'xScale.scale', function() {
    let scale = this.get('xScale.scale');
    let accessor = this.get('xAccessor');

    if(scale) {
      this.get('line').x((dataPoint) => {return scale(accessor.extract(dataPoint));});
      Ember.run.next(this, 'plot');
    }
  })),

  yScaleUpdated: on('init', observer('yScale', 'yScale.scale', function() {
    let scale = this.get('yScale.scale');
    let accessor = this.get('yAccessor');

    if(scale) {
      this.get('line').y((dataPoint) => {return scale(accessor.extract(dataPoint));});
      Ember.run.next(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');
    let stroke = this.get('stroke');
    let transition = this.get('transition');

    if(!d3Selection || !data || !xScale || !yScale) {
      return;
    }

    if(!(data[0] instanceof Array)) {
      data = [data];
    }

    let line = this.get('line');
    let d3Data = d3Selection.selectAll("path.line").data(data);

    d3Data.enter().append("path").attr("class", "line");

    if(stroke) {
      d3Data.style("stroke", stroke);
    }

    if(transition)
      transition(this, d3Data);

    d3Data.attr("d", (dataPoint) => {return line(dataPoint);});
    d3Data.exit().remove();
  }
});
