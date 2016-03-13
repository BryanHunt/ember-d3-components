import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-ordinal-scale', 'Unit | Utility | scales/d3 ordinal scale');

test('domain/range', function(assert) {
  let scale = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]}).get('scale');
  assert.equal(scale("Two"), 1);
});

test('domain element changed', function(assert) {
  let domain = Ember.A(["One", "Two",]);
  let scale = this.subject({domain: domain, range: [0, 1, 2]}).get('scale');
  domain.pushObject("Three");
  assert.equal(scale("Three"), 2);
});

test('domain changed', function(assert) {
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', ["X", "Y", "Z"]);
  assert.equal(scale("Y"), 1);
});

test('range element changed', function(assert) {
  let range = Ember.A([0, 1]);
  let scale = this.subject({domain: ["One", "Two", "Three"], range: range}).get('scale');
  range.pushObject(2);
  assert.equal(scale("Three"), 2);
});

test('range changed', function(assert) {
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [3, 4, 5]);
  assert.equal(scale("Two"), 4);
});
