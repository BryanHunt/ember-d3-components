import Ember from 'ember';
import D3Group from './d3-group';

const { observer } = Ember;

export default D3Group.extend({
  radius: 4.5,
  dataX: "x",
  dataY: "y",
  dataR: "r",

  propertyChanged: observer('d3Selection', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'rScale', 'rScale.scale','data', function() {
    Ember.run.once(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale.scale');
    let yScale = this.get('yScale.scale');
    let rScale = this.get('rScale.scale');
    let dataX = this.get('dataX');
    let dataY = this.get('dataY');
    let dataR = this.get('dataR');
    let fill = this.get('fill');
    let stroke = this.get('stroke');

    if(!d3Selection || !data || !xScale || !yScale) {
      return;
    }

    let d3Data = d3Selection.selectAll(`circle`).data(data);

    d3Data.enter().append("circle").attr("class", `circle`);

    if(fill) {
      d3Data.style("fill", fill);
    }

    if(stroke) {
      d3Data.style("stroke", stroke);
    }

    d3Data.transition()
      .attr("cx", (dataPoint) => {return xScale(dataPoint[dataX]);})
      .attr("cy", (dataPoint) => {return yScale(dataPoint[dataY]);});

    if(rScale) {
      d3Data.attr("r", (dataPoint) => {return rScale(dataPoint[dataR])});
    } else {
      d3Data.attr("r", this.get('radius'));
    }

    d3Data.exit().remove();
  }
});
