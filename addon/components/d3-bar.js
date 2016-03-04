import Ember from 'ember';
import D3Group from './d3-group';
import Accessor from '../utils/accessor';

const { observer } = Ember;

export default D3Group.extend({
  orientation: "bottom",

  init() {
    this._super(...arguments);
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.yAccessor = this.yAccessor || Accessor.create({name: "y"});
  },

  propertyChanged: observer('d3Selection', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'data', 'barWidthTransform', function() {
    Ember.run.next(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let orientation = this.get('orientation');
    var xScale = this.get('xScale.scale');
    var yScale = this.get('yScale.scale');
    let xAccessor = this.get('xAccessor');
    let yAccessor = this.get('yAccessor');
    let transition = this.get('transition');

    let data = this.get('data');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !data || !barWidthTransform) {
      return;
    }

    var x, y, width, height;

    if(orientation === "bottom" || orientation === "top") {
      let range = this.get('yScale.range');
      x = (dataPoint) => {return xScale(xAccessor.extract(dataPoint));};
      width = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "bottom") {
        y = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
        height = (dataPoint) => {return range[range.length - 1] - yScale(yAccessor.extract(dataPoint));};
      } else {
        y = () => {return 0;};
        height = (dataPoint) => {return yScale(yAccessor.extract(dataPoint));};
      }
    } else {
      let range = this.get('xScale.range');
      y = (dataPoint) => {return yScale(xAccessor.extract(dataPoint));};
      height = (dataPoint) => {return barWidthTransform(dataPoint, yScale);};

      if(orientation === "left") {
        x = () => {return 0;};
        width = (dataPoint) => {return xScale(yAccessor.extract(dataPoint));};
      } else {
        x = (dataPoint) => {return xScale(yAccessor.extract(dataPoint));};
        width = (dataPoint) => {return range[range.length - 1] - xScale(yAccessor.extract(dataPoint));};
      }
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");

    if(transition)
      transition(this, d3Data);

    d3Data.attr("x", x).attr("y", y).attr("height", height).attr("width", width);
    d3Data.exit().remove();
  }
});
