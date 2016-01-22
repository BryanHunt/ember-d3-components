import Ember from 'ember';

const { Object, observer } = Ember;

export default Object.extend({
  svg: null,
  xScale: null,
  yScale: null,
  data: null,

  plot: observer('svg', 'xScale', 'yScale', 'data', function() {
    var svg = this.get('svg');
    var xScale = this.get('xScale');
    var yScale = this.get('yScale');
    var data = this.get('data')

    if(!svg || !xScale || !yScale || !data)
      return;

    var line = d3.svg.line();
    line.x((dataPoint) => {return xScale(dataPoint.x);});
    line.y((dataPoint) => {return yScale(dataPoint.y);});

    svg.selectAll("path.line").data(data).enter().append("path").attr("class", "line");
    svg.selectAll("path.line").data(data).attr("d", (dataPoint) => {return line(dataPoint);});
    svg.selectAll("path.line").data(data).exit().remove();
  })
});
