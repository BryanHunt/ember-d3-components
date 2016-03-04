import Ember from 'ember';
import D3Group from './d3-group';
import Accessor from '../utils/accessor';

const { on, observer } = Ember;

export default D3Group.extend({
  init() {
    this._super(...arguments);
    this.area = d3.svg.area();
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.yAccessor = this.yAccessor || Accessor.create({name: "y"});
    this.y0Accessor = this.y0Accessor || Accessor.create({name: "y"});
  },

  propertiesUpdated: observer('d3Selection', 'data', function() {
    Ember.run.next(this, 'plot');
  }),

  xScaleUpdated: on('init', observer('xScale', 'xScale.scale', function() {
    let scale = this.get('xScale.scale');
    let accessor = this.get('xAccessor');

    if(scale) {
      this.get('area').x((dataPoint) => {return scale(accessor.extract(dataPoint));});
      Ember.run.next(this, 'plot');
    }
  })),

  y0ScaleUpdated: on('init', observer('y0Scale', 'y0Scale.scale', function() {
    let scale = this.get('y0Scale.scale');
    let accessor = this.get('y0Accessor');

    if(scale) {
      this.get('area').y0((dataPoint) => {return scale(accessor.extract(dataPoint));});
      Ember.run.next(this, 'plot');
    }
  })),

  y1ScaleUpdated: on('init', observer('y1Scale', 'y1Scale.scale', function() {
    let scale = this.get('y1Scale.scale');
    let accessor = this.get('yAccessor');

    if(scale) {
      this.get('area').y1((dataPoint) => {return scale(accessor.extract(dataPoint));});
      Ember.run.next(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let y0Scale = this.get('y0Scale');
    let y1Scale = this.get('y1Scale');
    let fill = this.get('fill');
    let transition = this.get('transition');

    if(!d3Selection || !data || !xScale || !y0Scale || !y1Scale) {
      return;
    }

    if(!(data[0] instanceof Array)) {
      data = [data];
    }

    let area = this.get('area');
    let d3Data = d3Selection.selectAll("path.area").data(data);

    d3Data.enter().append("path").attr("class", "area");

    if(transition)
      transition(this, d3Data);

    if(fill) {
      d3Data.style("fill", fill);
    }

    d3Data.attr("d", (dataPoint) => {return area(dataPoint);});
    d3Data.exit().remove();
  }
});
