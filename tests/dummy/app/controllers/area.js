import Ember from 'ember';
import LinearScale from '../utils/scales/d3-linear-scale';

export default Ember.Controller.extend({
  xScale: LinearScale.create({domain: [10, 0], range: [0, 50]}),
  yScale: LinearScale.create({domain: [10, 0], range: [0, 50]}),
  y0Scale: LinearScale.create({domain: [0, 10], range: [50, 50]}),
  data: [{x: 0, y: 0}, {x: 10, y: 10}]
});
