import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  domainChanged: on('init', observer('domain', function() {
    let domain = this.get('domain');

    if(domain) {
      this.get('scale').domain(domain);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  rangeChanged: on('init', observer('range', function() {
    let range = this.get('range');

    if(range) {
      this.get('scale').range(range);
      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),
});
