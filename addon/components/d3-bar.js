import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  orientation: "bottom",

  propertyChanged: observer('d3Selection', 'xScale', 'yScale', 'data', 'barWidthTransform', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let orientation = this.get('orientation');
    var xScale = this.get('xScale.scale');
    var yScale = this.get('yScale.scale');

    let data = this.get('data');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !data || !barWidthTransform) {
      return;
    }

    if(orientation === "bottom" || orientation === "top") {
      var range = this.get('yScale.range');
      var x = (dataPoint) => {return xScale(dataPoint.x);};
      var width = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "bottom") {
        var y = (dataPoint) => {return yScale(dataPoint.y);};
        var height = (dataPoint) => {return range[range.length - 1] - yScale(dataPoint.y);};
      } else {
        var y = (dataPoint) => {return 0;};
        var height = (dataPoint) => {return yScale(dataPoint.y);};
      }
    } else {
      var range = this.get('xScale.range');
      var y = (dataPoint) => {return yScale(dataPoint.x);};
      var height = (dataPoint) => {return barWidthTransform(dataPoint, yScale);};

      if(orientation === "left") {
        var x = (dataPoint) => {return 0;};
        var width = (dataPoint) => {return xScale(dataPoint.y);};
      } else {
        var x = (dataPoint) => {return xScale(dataPoint.y);};
        var width = (dataPoint) => {return range[range.length - 1] - xScale(dataPoint.y);};
      }
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");
    d3Data.attr("x", x).attr("y", y).attr("height", height).attr("width", width);
    d3Data.exit().remove();
  }
});
