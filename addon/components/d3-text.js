import Ember from 'ember';
import D3Component from './d3-component';

const { observer } = Ember;

export default D3Component.extend({
  tagName: 'text',
  attributeBindings: ['transform', 'x', 'y', 'dy'],
  anchor: "middle",
  value: "",

  propertiesUpdated: observer('d3Selection', 'anchor', 'value', function() {
    let d3Selection = this.get('d3Selection');

    if(!d3Selection) {
      return;
    }

    let anchor = this.get('anchor');

    if(anchor) {
      d3Selection.style("text-anchor", anchor);
    }

    let value = this.get('value');

    if(value) {
      d3Selection.text(value);
    }
  })
});
