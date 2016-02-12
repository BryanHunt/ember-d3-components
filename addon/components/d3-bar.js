import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  orientation: "bottom",
  groupName: "group",
  valueName: "value",

  propertyChanged: observer('d3Selection', 'xScale', 'yScale', 'data', 'barWidthTransform', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let orientation = this.get('orientation');
    var xScale = this.get('xScale.scale');
    var yScale = this.get('yScale.scale');
    var groupName = this.get('groupName');
    var valueName = this.get('valueName');

    let data = this.get('data');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !data || !barWidthTransform) {
      return;
    }

    if(orientation === "bottom" || orientation === "top") {
      var range = this.get('yScale.range');
      var x = (dataPoint) => {return xScale(dataPoint[groupName]);};
      var width = (dataPoint) => {return barWidthTransform(dataPoint, xScale);};

      if(orientation === "bottom") {
        var y = (dataPoint) => {return yScale(dataPoint[valueName]);};
        var height = (dataPoint) => {return range[range.length - 1] - yScale(dataPoint[valueName]);};
      } else {
        var y = (dataPoint) => {return 0;};
        var height = (dataPoint) => {return yScale(dataPoint[valueName]);};
      }
    } else {
      var range = this.get('xScale.range');
      var y = (dataPoint) => {return yScale(dataPoint[groupName]);};
      var height = (dataPoint) => {return barWidthTransform(dataPoint, yScale);};

      if(orientation === "left") {
        var x = (dataPoint) => {return 0;};
        var width = (dataPoint) => {return xScale(dataPoint[valueName]);};
      } else {
        var x = (dataPoint) => {return xScale(dataPoint[valueName]);};
        var width = (dataPoint) => {return range[range.length - 1] - xScale(dataPoint[valueName]);};
      }
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");
    d3Data.attr("x", x).attr("y", y).attr("height", height).attr("width", width);
    d3Data.exit().remove();
  }
});
