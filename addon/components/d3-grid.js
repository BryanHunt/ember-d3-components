import Ember from 'ember';
import Axis from './d3-axis';

const { on, observer } = Ember;

export default Axis.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('tickFormat', "");
  },

  updateTransform: on('init', observer('width', 'height', 'orientation', function() {
    Ember.run.once(this, this.updateGrid);
  })),

  updateGrid() {
    let orientation = this.get('orientation');
    let translateY = 0;
    let yOffset = this.get('yOffset');

    if(yOffset !== undefined) {
      translateY += yOffset;
    }

    if(orientation === 'bottom') {
      translateY += this.get('height');
    }

    if(orientation === 'top' || orientation === 'bottom') {
      this.set('translateY', translateY);
      this.set('innerTickSize', -this.get('height'));
    } else {
      this.set('translateY', translateY);
      this.set('innerTickSize', -this.get('width'));
    }
  }
});
