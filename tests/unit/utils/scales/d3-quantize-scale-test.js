import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-quantize-scale', 'Unit | Utility | scales/d3 quantize scale');

test('domain/range', function(assert) {
  let scale = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]}).get('scale');
  assert.equal(scale(2), "white");
});

test('domain element changed', function(assert) {
  let domain = Ember.A([1, 2, 3]);
  let scale = this.subject({domain: domain, range: ["blue", "white", "red"]}).get('scale');
  domain.replace(1, 1, 5);
  assert.equal(scale(5), "red");
});

test('domain changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [4, 5, 6]);
  assert.equal(scale(5), "white");
});

test('range element changed', function(assert) {
  let range = Ember.A(["blue", "white", "red"]);
  let scale = this.subject({domain: [1, 2, 3], range: range}).get('scale');
  range.replace(1, 1, "gold");
  assert.equal(scale(2), "gold");
});

test('range changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', ["blue", "gold", "red"]);
  assert.equal(scale(2), "gold");
});
