export default Ember.Object.extend({
  svg: null,
  xScale: null,
  yScale: null,
  padding: 4,
  data: null,
  width: null,
  height: null,

  plot: function() {
    var padding = this.get('padding');
    var width = this.get('width');
    var height = this.get('height');
    var svg = this.get('svg');
    var xScale = this.get('xScale');
    var yScale = this.get('yScale');
    var data = this.get('data')

    if(!svg || !xScale || !yScale || !data || !width || !height)
      return;

    svg.selectAll("rect.bar").data(data).enter().append("rect").attr("class", "bar");
    svg.selectAll("rect.bar").data(data).attr("x", function(dataPoint){return xScale(dataPoint.x);})
                                        .attr("y", function(dataPoint){return yScale(dataPoint.y);})
                                        .attr("height", function(dataPoint){return height - yScale(dataPoint.y);})
                                        .attr("width", function(dataPoint){return Math.floor(width / data.length) - padding});
    svg.selectAll("rect.bar").data(data).exit().remove();
  }.observes('svg', 'xScale', 'yScale', 'data', 'padding', 'width', 'height')
});
