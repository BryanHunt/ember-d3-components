import Ember from 'ember';
import Axis from './d3-axis';

const { on, observer } = Ember;

export default Axis.extend({
  init() {
    this._super(...arguments);
    this.set('tickFormat', "");
  },

  parametersChanged: on('init', observer('width', 'height', 'orientation', function() {
    Ember.run.once(this, this.updateGrid);
  })),

  updateGrid() {
    let orientation = this.get('orientation');

    if(orientation === 'top' || orientation === 'bottom') {
      this.set('innerTickSize', -this.get('height'));
    } else {
      this.set('innerTickSize', -this.get('width'));
    }
  }
});
