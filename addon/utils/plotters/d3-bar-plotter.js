import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  plot: observer('svg', 'xScale.scale', 'yScale.scale', 'data', 'width', 'height', function() {
    let width = this.get('width');
    let height = this.get('height');
    let svg = this.get('svg');
    let xScale = this.get('xScale.scale');
    let yScale = this.get('yScale.scale');
    let data = this.get('data');

    if(!svg || !xScale || !yScale || !data || !width || !height) {
      return;
    }

    svg.selectAll("rect.bar").data(data).enter().append("rect").attr("class", "bar");
    svg.selectAll("rect.bar").data(data).attr("x", (dataPoint) => {return xScale(dataPoint.x);})
                                        .attr("y", (dataPoint) => {return yScale(dataPoint.y);})
                                        .attr("height", (dataPoint) => {return height - yScale(dataPoint.y);})
                                        .attr("width", xScale.rangeBand());
    svg.selectAll("rect.bar").data(data).exit().remove();
  })
});
