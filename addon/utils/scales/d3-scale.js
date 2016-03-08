import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  domainChanged: on('init', observer('domain.[]', function() {
    this.updateScale('domain');
  })),

  rangeChanged: on('init', observer('range.[]', function() {
    this.updateScale('range');
  })),

  updateScale(propertyName) {
    let value = this.get(propertyName);

    if(value !== undefined && value !== null) {
      let scale = this.get('scale');
      let prop = scale[propertyName];
      prop(value);
      Ember.run.next(this, 'notifyPropertyChange', 'scale');
    }
  }
});
