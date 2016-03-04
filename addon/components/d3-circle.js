import Ember from 'ember';
import D3Group from './d3-group';
import Accessor from '../utils/accessor';

const { observer } = Ember;

export default D3Group.extend({
  radius: 4.5,

  init() {
    this._super(...arguments);
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.yAccessor = this.yAccessor || Accessor.create({name: "y"});
    this.rAccessor = this.rAccessor || Accessor.create({name: "r"});
  },

  propertyChanged: observer('d3Selection', 'xScale', 'xScale.scale', 'yScale', 'yScale.scale', 'rScale', 'rScale.scale','data', function() {
    Ember.run.next(this, 'plot');
  }),

  plot() {
    let d3Selection = this.get('d3Selection');
    let data = this.get('data');
    let xScale = this.get('xScale.scale');
    let yScale = this.get('yScale.scale');
    let rScale = this.get('rScale.scale');
    let fill = this.get('fill');
    let stroke = this.get('stroke');
    let xAccessor = this.get('xAccessor');
    let yAccessor = this.get('yAccessor');
    let rAccessor = this.get('rAccessor');

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
      .attr("cx", (dataPoint) => {return xScale(xAccessor.extract(dataPoint));})
      .attr("cy", (dataPoint) => {return yScale(yAccessor.extract(dataPoint));});

    if(rScale) {
      d3Data.attr("r", (dataPoint) => {return rScale(rAccessor.extract(dataPoint))});
    } else {
      d3Data.attr("r", this.get('radius'));
    }

    d3Data.exit().remove();
  }
});
