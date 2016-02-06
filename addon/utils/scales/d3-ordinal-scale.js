import Ember from 'ember';
import Scale from './d3-scale';

const { on, observer } = Ember;

export default Scale.extend({
  init() {
    this.set('scale', d3.scale.ordinal());
  },

  rangePointsChanged: on('init', observer('rangePoints.[]', 'padding', function() {
    let rangePoints = this.get('rangePoints');
    let padding = this.get('padding');

    if(rangePoints) {
      if(padding) {
        this.get('scale').rangePoints(rangePoints, padding);
      } else {
        this.get('scale').rangePoints(rangePoints);
      }

      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  rangeRoundPointsChanged: on('init', observer('rangeRoundPoints.[]', 'padding', function() {
    let rangeRoundPoints = this.get('rangeRoundPoints');
    let padding = this.get('padding');

    if(rangeRoundPoints) {
      if(padding) {
        this.get('scale').rangeRoundPoints(rangeRoundPoints, padding);
      } else {
        this.get('scale').rangeRoundPoints(rangeRoundPoints);
      }

      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  rangeBandsChanged: on('init', observer('rangeBands.[]', 'padding', 'outerPadding', function() {
    let rangeBands = this.get('rangeBands');
    let padding = this.get('padding');
    let outerPadding = this.get('outerPadding');

    if(rangeBands) {
      if(padding) {
        if(outerPadding) {
          this.get('scale').rangeBands(rangeBands, padding, outerPadding);
        } else {
          this.get('scale').rangeBands(rangeBands, padding);
        }
      } else {
        this.get('scale').rangeBands(rangeBands);
      }

      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  })),

  rangeRoundBandsChanged: on('init', observer('rangeRoundBands.[]', 'padding', 'outerPadding', function() {
    let rangeRoundBands = this.get('rangeRoundBands');
    let padding = this.get('padding');
    let outerPadding = this.get('outerPadding');

    if(rangeRoundBands) {
      if(padding) {
        if(outerPadding) {
          this.get('scale').rangeRoundBands(rangeRoundBands, padding, outerPadding);
        } else {
          this.get('scale').rangeRoundBands(rangeRoundBands, padding);
        }
      } else {
        this.get('scale').rangeRoundBands(rangeRoundBands);
      }

      Ember.run.once(this, 'notifyPropertyChange', 'scale');
    }
  }))
});
