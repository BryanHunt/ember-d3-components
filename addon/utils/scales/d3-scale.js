import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  domainChanged: on('init', observer('domain.[]', function() {
    this.updateScale('domain');
  })),

  rangeChanged: on('init', observer('range.[]', function() {
    this.updateScale('range');
  })),

  updateScale(propertyName, functionName) {
    let value = this.get(propertyName);

    if(value !== undefined && value !== null) {
      let fName = functionName || propertyName;
      let scale = this.get('scale');
      let d3Property = scale[fName];
      d3Property(value);
      Ember.run.next(this, 'notifyPropertyChange', 'scale');
    }
  }
});
