import Ember from 'ember';
import D3PropertyUpdaterMixin from 'ember-d3-components/mixins/d3-property-updater';
import { module, test } from 'qunit';

module('Unit | Mixin | d3 property updater');

// Replace this with your real tests.
test('it works', function(assert) {
  let D3PropertyUpdaterObject = Ember.Object.extend(D3PropertyUpdaterMixin);
  let subject = D3PropertyUpdaterObject.create();
  assert.ok(subject);
});
