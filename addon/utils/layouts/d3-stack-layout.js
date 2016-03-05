import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  init() {
    this.set('layout', d3.layout.stack());
  },

  valuesChanged: on('init', observer('values', function() {
    let values = this.get('values');

    if(values) {
      this.get('layout').values(values);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  offsetChanged: on('init', observer('offset', function() {
    let offset = this.get('offset');

    if(offset) {
      this.get('layout').offset(offset);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  orderChanged: on('init', observer('order', function() {
    let order = this.get('order');

    if(order) {
      this.get('layout').order(order);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  xChanged: on('init', observer('x', function() {
    let x = this.get('x');

    if(x) {
      this.get('layout').x(x);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  yChanged: on('init', observer('y', function() {
    let y = this.get('y');

    if(y) {
      this.get('layout').y(y);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  outChanged: on('init', observer('out', function() {
    let out = this.get('out');

    if(out) {
      this.get('layout').out(out);
      Ember.run.once(this, 'notifyPropertyChange', 'layout');
    }
  }))
});
