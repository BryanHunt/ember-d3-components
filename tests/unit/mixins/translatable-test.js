import Ember from 'ember';
import TranslatableMixin from '../../../mixins/translatable';
import { module, test } from 'qunit';

module('Unit | Mixin | translatable');

// Replace this with your real tests.
test('it works', function(assert) {
  let TranslatableObject = Ember.Object.extend(TranslatableMixin);
  let subject = TranslatableObject.create();
  assert.ok(subject);
});
