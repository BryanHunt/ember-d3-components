import Ember from 'ember';

export default Ember.Mixin.create({
  updateProperty(propertyName, valueName) {
    let value = this.get(valueName);

    if(value !== undefined && value !== null) {
      let property = this.get(propertyName);
      let d3Property = property[valueName];
      d3Property(value);
      Ember.run.next(this, 'notifyPropertyChange', propertyName);
    }
  }
});
