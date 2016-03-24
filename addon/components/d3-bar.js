import Ember from 'ember';
import D3Group from './d3-group';
import Accessor from '../utils/d3-data-accessor';

const { observer } = Ember;

export default D3Group.extend({
  orientation: "bottom",

  init() {
    this._super(...arguments);
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.yAccessor = this.yAccessor || Accessor.create({name: "y"});
    this.y0Accessor = this.y0Accessor || Accessor.create({name: "y"});
  },

  propertyChanged: observer('d3Selection', 'orientation', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'y0Scale', 'y0Scale.scale', 'data', 'barWidthTransform', function() {
    Ember.run.next(this, 'draw');
  }),

  draw() {
    let d3Selection = this.get('d3Selection');
    let orientation = this.get('orientation');
    var xScale = this.get('xScale.scale');
    var yScale = this.get('yScale.scale');
    var y0Scale = this.get('y0Scale.scale');
    let xAccessor = this.get('xAccessor');
    let yAccessor = this.get('yAccessor');
    let y0Accessor = this.get('y0Accessor');
    let transition = this.get('transition');
    let fill = this.get('fill');

    let data = this.get('data');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !y0Scale || !data || !barWidthTransform) {
      return;
    }

    var x, y, width, height;

    if(orientation === "bottom" || orientation === "top") {
      let range = this.get('yScale.range');
      x = (dataPoint) => {return xScale(xAccessor.extract(dataPoint));};
      width = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "bottom") {
        y = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
        height = (dataPoint) => {return y0Scale(y0Accessor.extract(dataPoint)) - yScale(yAccessor.extract(dataPoint))};
      } else {
        y = (dataPoint) => {return y0Scale(y0Accessor.extract(dataPoint));};
        height = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
      }
    } else {
      let range = this.get('xScale.range');
      y = (dataPoint) => {return xScale(xAccessor.extract(dataPoint));};
      height = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "left") {
        x = (dataPoint) => {return y0Scale(y0Accessor.extract(dataPoint));};
        width = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
      } else {
        x = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
        width = (dataPoint) => {return y0Scale(y0Accessor.extract(dataPoint)) - yScale(yAccessor.extract(dataPoint));};
      }
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");

    if(transition)
      transition(this, d3Data);

    d3Data.attr("x", x).attr("y", y).attr("height", height).attr("width", width);

    if(fill) {
      d3Data.style("fill", fill);
    }

    d3Data.exit().remove();
  }
});
