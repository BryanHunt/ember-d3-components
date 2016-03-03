import Ember from 'ember';
import D3Group from './d3-group';

const { observer, on } = Ember;

export default D3Group.extend({
  init() {
    this._super(...arguments);
    this.set('arc', d3.svg.arc());
  },

  propertyChanged: observer('d3Selection', 'fill', 'transition','data', function() {
    Ember.run.once(this, 'plot');
  }),

  innerRadiusChanged: on('init', observer('innerRadius', function() {
    let innerRadius = this.get('innerRadius');

    if(innerRadius) {
      this.get('arc').innerRadius(innerRadius);
      Ember.run.once(this, 'plot');
    }
  })),

  outerRadiusChanged: on('init', observer('outerRadius', function() {
    let outerRadius = this.get('outerRadius');

    if(outerRadius) {
      this.get('arc').outerRadius(outerRadius);
      Ember.run.once(this, 'plot');
    }
  })),

  plot() {
    let d3Selection = this.get('d3Selection');
    let arc = this.get('arc');
    let data = this.get('data');
    let transition = this.get('transition');
    let fill = this.get('fill');

    if(!d3Selection || !data) {
      return;
    }

    let d3Data = d3Selection.selectAll(`path.arc`).data(data);

    d3Data.enter().append("path").attr("class", `arc`);

    if(fill) {
      d3Data.style("fill", fill);
    }

    if(transition)
      transition(this, d3Data, arc);

    d3Data.exit().remove();
  }
});
