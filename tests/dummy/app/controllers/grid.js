import Ember from 'ember';
import LinearScale from '../utils/scales/d3-linear-scale';

export default Ember.Controller.extend({
  scale: LinearScale.create({domain: [0, 10], range: [10, 200]})
});
