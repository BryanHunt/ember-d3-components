import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  propertyChanged: observer('d3Selection', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'data', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale');
    let yScale = this.get('yScale');

    if(!d3Selection || !data || !xScale || !yScale) {
      return;
    }

    let d3Data = d3Selection.selectAll(`circle`).data(data);

    d3Data.enter().append("circle").attr("class", `circle`).attr("r", 4.5);
    d3Data.attr("cx", (dataPoint) => {return xScale.scale(dataPoint.x);}).attr("cy", (dataPoint) => {return yScale.scale(dataPoint.y);})
    d3Data.exit().remove();
  }
});
