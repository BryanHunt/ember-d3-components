import Ember from 'ember';
import Axis from './d3-axis';

const { on, observer } = Ember;

export default Axis.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('tickFormat', "");
    this.set('translateX', 25);
  },

  updateTransform: on('init', observer('width', 'height', 'orientation', function() {
    let orientation = this.get('orientation');

    if(orientation === 'top' || orientation === 'bottom') {
      this.set('translateY', this.get('height') + 25);
      this.set('innerTickSize', -this.get('height'));
    } else {
      this.set('translateY', 25);
      this.set('innerTickSize', -this.get('width'));
    }
  }))
});
