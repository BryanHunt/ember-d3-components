import Ember from 'ember';

const { observer } = Ember;

export default Ember.Object.extend({
  svg: null,
  xScale: null,
  yScale: null,
  padding: 4,
  data: null,
  width: null,
  height: null,

  plot: observer('svg', 'xScale', 'yScale', 'data', 'padding', 'width', 'height', function() {
    let padding = this.get('padding');
    let width = this.get('width');
    let height = this.get('height');
    let svg = this.get('svg');
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');
    let data = this.get('data');

    if(!svg || !xScale || !yScale || !data || !width || !height) {
      return;
    }

    svg.selectAll("rect.bar").data(data).enter().append("rect").attr("class", "bar");
    svg.selectAll("rect.bar").data(data).attr("x", (dataPoint) => {return xScale(dataPoint.x);})
                                        .attr("y", (dataPoint) => {return yScale(dataPoint.y);})
                                        .attr("height", (dataPoint) => {return height - yScale(dataPoint.y);})
                                        .attr("width", () => {return Math.floor(width / data.length) - padding;});
    svg.selectAll("rect.bar").data(data).exit().remove();
  })
});
