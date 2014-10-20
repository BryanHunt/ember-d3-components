import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],

  didInsertElement: function() {
    var id = "#" + this.elementId;
    var axis = d3.svg.axis().scale(this.get('scale')).orient(this.get('orientation'));
    d3.select(id).call(axis);

    if(this.get('grid')) {
      var x1 = this.get('grid.x1');
      var x2 = this.get('grid.x2');
      var y1 = this.get('grid.y1');
      var y2 = this.get('grid.y2');
      d3.selectAll(id + " g.tick").append("line").classed("grid-line", true).attr("x1", x1). attr("y1", y1).attr("x2", x2).attr("y2", y2);
    }
  }
});
