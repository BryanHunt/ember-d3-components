import Ember from 'ember';
import OrdinalScale from '../utils/scales/d3-ordinal-scale';
import LinearScale from '../utils/scales/d3-linear-scale';

export default Ember.Controller.extend({
  xScale: OrdinalScale.create({domain: ["One", "Two"], rangeBands: [10, 50]}),
  yScale: LinearScale.create({domain: [10, 0], range: [0, 50]}),
  y0Scale: LinearScale.create({domain: [1, 10], range: [50, 50]}),
  barWidthTransform: function(dataPoint, scale) {return scale.rangeBand();},
  data: [{x: "One", y: 7}]
});
