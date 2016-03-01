import Ember from 'ember';

export default Ember.Object.extend({
  name: "value",
  extract(dataPoint) {
    return dataPoint[this.get('name')];
  }
});
