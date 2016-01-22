import Ember from 'ember';

const { observer } = Ember;

export default Ember.Object.extend({
  svg: null,
  xScale: null,
  yScale: null,
  data: null,

  plot: observer('svg', 'xScale.scale', 'yScale.scale', 'data', function() {
    let svg = this.get('svg');
    let xScale = this.get('xScale.scale');
    let yScale = this.get('yScale.scale');
    let data = this.get('data');

    if(!svg || !xScale || !yScale || !data) {
      return;
    }

    let line = d3.svg.line();
    line.x((dataPoint) => {return xScale(dataPoint.x);});
    line.y((dataPoint) => {return yScale(dataPoint.y);});

    svg.selectAll("path.line").data(data).enter().append("path").attr("class", "line");
    svg.selectAll("path.line").data(data).attr("d", (dataPoint) => {return line(dataPoint);});
    svg.selectAll("path.line").data(data).exit().remove();
  })
});
