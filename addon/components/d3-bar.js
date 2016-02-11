import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  propertyChanged: observer('svg', 'xScale.scale', 'yScale.scale', 'data', 'width', 'height', 'barWidthTransform', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let xScale = this.get('xScale.scale');
    let yScale = this.get('yScale.scale');
    let data = this.get('data');
    let width = this.get('width');
    let height = this.get('height');
    let barWidthTransform = this.get('barWidthTransform');

    if(!d3Selection || !xScale || !yScale || !data || !width || !height || !barWidthTransform) {
      return;
    }

    let d3Data = d3Selection.selectAll("rect.bar").data(data)

    d3Data.enter().append("rect").attr("class", "bar");
    d3Data.attr("x", (dataPoint) => {return xScale(dataPoint.x);})
      .attr("y", (dataPoint) => {return yScale(dataPoint.y);})
      .attr("height", (dataPoint) => {return height - yScale(dataPoint.y);})
      .attr("width", (dataPoint) => {return barWidthTransform(dataPoint, xScale);});
    d3Data.exit().remove();
  }
});
