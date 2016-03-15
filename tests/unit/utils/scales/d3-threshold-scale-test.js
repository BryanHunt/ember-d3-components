import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-threshold-scale', 'Unit | Utility | scales/d3 threshold scale');

test('domain/range', function(assert) {
  let scale = this.subject({domain: [0, 10], range: ['a', 'b', 'c']}).get('scale');
  assert.equal(scale(5), 'b');
});

test('domain element changed', function(assert) {
  let domain = Ember.A([0, 10]);
  let scale = this.subject({domain: domain, range: ['a', 'b', 'c']}).get('scale');
  domain.replace(1, 1, 100);
  assert.equal(scale(50), 'b');
});

test('domain changed', function(assert) {
  let scaleObserver = this.subject({domain: [0, 10], range: ['a', 'b', 'c']});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [0, 100]);
  assert.equal(scale(50), 'b');
});

test('range element changed', function(assert) {
  let range = Ember.A(['a', 'b', 'c']);
  let scale = this.subject({domain: [0,10], range: range}).get('scale');
  range.replace(1, 1, 'x');
  assert.equal(scale(5), 'x');
});

test('range changed', function(assert) {
  let scaleObserver = this.subject({domain: [0, 10], range: ['a', 'b', 'c']});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', ['a', 'x', 'c']);
  assert.equal(scale(5), 'x');
});
