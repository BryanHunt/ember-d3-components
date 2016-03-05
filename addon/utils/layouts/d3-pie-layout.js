import Ember from 'ember';

const { on, observer } = Ember;

export default Ember.Object.extend({
  init() {
    this.set('layout', d3.layout.pie());
  },

  valueChanged: on('init', observer('value', function() {
    let value = this.get('value');

    if(value) {
      this.get('layout').value(value);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  sortChanged: on('init', observer('sort', function() {
    let sort = this.get('sort');

    if(sort) {
      this.get('layout').sort(sort);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  startAngleChanged: on('init', observer('startAngle', function() {
    let startAngle = this.get('startAngle');

    if(startAngle) {
      this.get('layout').startAngle(startAngle);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  endAngleChanged: on('init', observer('endAngle', function() {
    let endAngle = this.get('endAngle');

    if(endAngle) {
      this.get('layout').endAngle(endAngle);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),

  padAngleChanged: on('init', observer('padAngle', function() {
    let padAngle = this.get('padAngle');

    if(padAngle) {
      this.get('layout').padAngle(padAngle);
      Ember.run.next(this, 'notifyPropertyChange', 'layout');
    }
  })),
});
