import Ember from 'ember';
import D3Component from './d3-component';

const { on, observer, computed } = Ember;

export default D3Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],

  init() {
    this.set('axis', d3.svg.axis());
    this._super(...arguments);
  },

  oritntationChanged: on('init', observer('orientation', function() {
    let orientation = this.get('orientation');

    if(orientation !== undefined) {
      this.get('axis').orient(orientation);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  scaleChanged: on('init', observer('scale.scale', function() {
    let scale = this.get('scale.scale');

    if(scale !== undefined) {
      this.get('axis').scale(scale);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  ticksChanged: on('init', observer('ticks', function() {
    let ticks = this.get('ticks');

    if(ticks !== undefined) {
      this.get('axis').ticks(ticks);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickValuesChanged: on('init', observer('tickValues', function() {
    let tickValues = this.get('tickValues');

    if(tickValues !== undefined) {
      this.get('axis').tickValues(tickValues);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickSizeChanged: on('init', observer('tickSize', function() {
    let tickSize = this.get('tickSize');

    if(tickSize !== undefined) {
      this.get('axis').tickSize(tickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  innerTickSizeChanged: on('init', observer('innerTickSize', function() {
    let innerTickSize = this.get('innerTickSize');

    if(innerTickSize !== undefined) {
      this.get('axis').innerTickSize(innerTickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  outerTickSizeChanged: on('init', observer('outerTickSize', function() {
    let outerTickSize = this.get('outerTickSize');

    if(outerTickSize !== undefined) {
      this.get('axis').outerTickSize(outerTickSize);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickFormatChanged: on('init', observer('tickFormat', function() {
    let tickFormat = this.get('tickFormat');

    if(tickFormat !== undefined) {
      this.get('axis').tickFormat(tickFormat);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickPaddingChanged: on('init', observer('tickPadding', function() {
    let tickPadding = this.get('tickPadding');

    if(tickPadding !== undefined) {
      this.get('axis').tickPadding(tickPadding);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  tickSubdivideChanged: on('init', observer('tickSubdivide', function() {
    let tickSubdivide = this.get('tickSubdivide');

    if(tickSubdivide !== undefined) {
      this.get('axis').tickSubdivide(tickSubdivide);
      Ember.run.once(this, this.updateAxis);
    }
  })),

  updateAxis() {
    let selection = this.get('d3Selection');
    let transition = this.get('transition');

    if(transition)
      transition(this, selection);
      
    selection.call(this.get('axis'));
  }
});
