import Scale from './d3-scale';

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.threshold());
  }
});
