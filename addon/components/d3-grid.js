import Ember from 'ember';
import Axis from './d3-axis';

const { on, observer } = Ember;

export default Axis.extend({
  tickFormat: "",

  parametersChanged: on('init', observer('width', 'height', 'orientation', function() {
    Ember.run.next(this, this.updateGrid);
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
