import Ember from 'ember';
import D3Component from './d3-component';

const { observer } = Ember;

export default D3Component.extend({
  tagName: 'text',
  attributeBindings: ['transform', 'x', 'y', 'dy'],
  anchor: "middle",
  value: "",

  propertiesUpdated: observer('d3Selection', 'anchor', 'value', function() {
    Ember.run.next(this, 'draw');
  }),

  draw() {
    let d3Selection = this.get('d3Selection');
    let value = this.get('value');

    if(!d3Selection || !value) {
      return;
    }

    let anchor = this.get('anchor');

    if(anchor) {
      d3Selection.style("text-anchor", anchor);
    }

    d3Selection.text(value);
  }
});
