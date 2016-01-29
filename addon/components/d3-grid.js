import Ember from 'ember';
import Axis from './d3-axis';

const { on, observer } = Ember;

export default Axis.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('tickFormat', "");
  },

  updateTransform: on('init', observer('width', 'height', 'orientation', function() {
    let orientation = this.get('orientation');

    if(orientation === 'top' || orientation === 'bottom') {
      let height = this.get('height') + 25;
      this.set('transform', "translate(25," + height + ")");
      this.set('innerTickSize', -this.get('height'));
    } else {
      this.set('transform', "translate(25, 25)");
      this.set('innerTickSize', -this.get('width'));
    }
  }))
});
