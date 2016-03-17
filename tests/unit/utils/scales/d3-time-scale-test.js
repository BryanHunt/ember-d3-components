import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-time-scale', 'Unit | Utility | scales/d3 time scale');

test('domain/range', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1,31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('domain element changed', function(assert) {
  assert.expect(4);
  let domain = Ember.A([new Date(2016, 1, 1), new Date(2016, 1, 30)]);
  let scaleObserver = this.subject({domain: domain, range: [1, 31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  domain.replace(1, 1, new Date(2016, 1, 31));
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('domain changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [new Date(2016, 1, 1), new Date(2016, 1, 31)]);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([1, 100]);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 31);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [1, 31]);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range round', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], rangeRound: [1, 31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('range round element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([1, 100]);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], rangeRound: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 31);
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('interpolate', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31], interpolate: d3.interpolateRound});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('interpolate changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('interpolate', d3.interpolateRound);
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('clamp', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31], clamp: true});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.ok(scale(new Date(2016, 2, 1)) < 31);
});

test('clamp changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('clamp', true);
  assert.ok(scale(new Date(2016, 2, 1)) < 31);
});
