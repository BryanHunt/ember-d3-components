import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-threshold-scale', 'Unit | Utility | scales/d3 threshold scale');

test('domain/range', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [0, 10], range: ['a', 'b', 'c']});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(5), 'b');
});

test('domain element changed', function(assert) {
  assert.expect(4);
  let domain = Ember.A([0, 10]);
  let scaleObserver = this.subject({domain: domain, range: ['a', 'b', 'c']});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  domain.replace(1, 1, 100);
  assert.equal(scale(50), 'b');
});

test('domain changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: ['a', 'b', 'c']});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [0, 100]);
  assert.equal(scale(50), 'b');
});

test('range element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A(['a', 'b', 'c']);
  let scaleObserver = this.subject({domain: [0,10], range: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 'x');
  assert.equal(scale(5), 'x');
});

test('range changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: ['a', 'b', 'c']});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', ['a', 'x', 'c']);
  assert.equal(scale(5), 'x');
});
