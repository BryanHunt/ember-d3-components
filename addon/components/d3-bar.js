import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  orientation: "bottom",
  dataX: "x",
  dataY: "y",

  propertyChanged: observer('d3Selection', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'data', 'barWidthTransform', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let orientation = this.get('orientation');
    var xScale = this.get('xScale.scale');
    var yScale = this.get('yScale.scale');
    var dataX = this.get('dataX');
    var dataY = this.get('dataY');

    let data = this.get('data');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !data || !barWidthTransform) {
      return;
    }

    var x, y, width, height;

    if(orientation === "bottom" || orientation === "top") {
      let range = this.get('yScale.range');
      x = (dataPoint) => {return xScale(dataPoint[dataX]);};
      width = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "bottom") {
        y = (dataPoint) => {return yScale(dataPoint[dataY]);};
        height = (dataPoint) => {return range[range.length - 1] - yScale(dataPoint[dataY]);};
      } else {
        y = () => {return 0;};
        height = (dataPoint) => {return yScale(dataPoint[dataY]);};
      }
    } else {
      let range = this.get('xScale.range');
      y = (dataPoint) => {return yScale(dataPoint[dataX]);};
      height = (dataPoint) => {return barWidthTransform(dataPoint, yScale);};

      if(orientation === "left") {
        x = () => {return 0;};
        width = (dataPoint) => {return xScale(dataPoint[dataY]);};
      } else {
        x = (dataPoint) => {return xScale(dataPoint[dataY]);};
        width = (dataPoint) => {return range[range.length - 1] - xScale(dataPoint[dataY]);};
      }
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");
    d3Data.transition().attr("x", x).attr("y", y).attr("height", height).attr("width", width);
    d3Data.exit().remove();
  }
});
