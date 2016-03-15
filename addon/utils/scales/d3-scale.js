import Ember from 'ember';
import PropertyUpdater from '../../mixins/d3-property-updater';

const { on, observer } = Ember;

export default Ember.Object.extend(PropertyUpdater, {
  domainChanged: on('init', observer('domain.[]', function() {
    this.updateProperty('scale', 'domain');
  })),

  rangeChanged: on('init', observer('range.[]', function() {
    this.updateProperty('scale', 'range');
  }))
});
