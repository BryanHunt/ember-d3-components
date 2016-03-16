import Ember from 'ember';
import D3PropertyUpdaterMixin from 'ember-d3-components/mixins/d3-property-updater';
import { module, test } from 'qunit';

module('Unit | Mixin | d3 property updater');

test('updateProperty', function(assert) {
  let D3PropertyUpdaterObject = Ember.Object.extend(D3PropertyUpdaterMixin);
  let subject = D3PropertyUpdaterObject.create();
  let propValue;
  subject.set('prop', {value: function(value) {
    propValue = value;
  }});
  subject.set('value', "foo");
  subject.updateProperty('prop', 'value');
  assert.equal(subject.get('propValue', "foo"));
});
