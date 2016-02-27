import Ember from 'ember';
import D3Group from './d3-group';

const { observer, on } = Ember;

export default D3Group.extend({
  init() {
    this._super.apply(this, arguments);
    this.set('arc', d3.svg.arc());
  },

  propertyChanged: observer('d3Selection', 'fill', 'layout', 'd3layout.layout','data', function() {
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
    let layout = this.get('d3layout.layout');
    let fill = this.get('fill');

    if(!d3Selection || !data || !layout) {
      return;
    }

    let d3Data = d3Selection.selectAll(`path.arc`).data(layout(data));

    d3Data.enter().append("path").attr("class", `arc`);

    if(fill) {
      d3Data.style("fill", fill);
    }

    let _this = this;
    d3Data.transition().attrTween("d", function(dataPoint) {
      let currentArc = _this.get('currentArc');

      if(!currentArc) {
        currentArc = {startAngle: 0, endAngle: 0};
      }

      let interpolate = d3.interpolate(currentArc, dataPoint);
      _this.set('currentArc', interpolate(1));

      return function(t) {
        return arc(interpolate(t));
      }
    });

    d3Data.exit().remove();
  }
});
