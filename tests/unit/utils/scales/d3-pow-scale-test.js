import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-pow-scale', 'Unit | Utility | scales/d3 pow scale');

test('domain/range', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(5), 50);
});

test('domain element changed', function(assert) {
  assert.expect(4);
  let domain = Ember.A([0, 10]);
  let scaleObserver = this.subject({domain: domain, range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  domain.replace(1, 1, 100);
  assert.equal(scale(50), 50);
});

test('domain changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [0, 100]);
  assert.equal(scale(50), 50);
});

test('range element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 100]);
  let scaleObserver = this.subject({domain: [0,10], range: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(5), 5);
});

test('range changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [0, 10]);
  assert.equal(scale(5), 5);
});

test('clamp', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100], clamp: true});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(20), 100);
});

test('clamp changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('clamp', true);
  assert.equal(scale(20), 100);
});

test('range round', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [0, 10], rangeRound: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(5.476), 55);
});

test('range round element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 100]);
  let scaleObserver = this.subject({domain: [0,10], rangeRound: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(5.3257), 5);
});

test('nice', function(assert) {
  assert.expect(5);
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100], nice: true});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 0.9);
});

test('nice changed', function(assert) {
  assert.expect(5);
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('nice', true);
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 0.9);
});

test('nice reset', function(assert) {
  assert.expect(6);
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100], nice: true});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('nice', false);
  let domain = scale.domain();
  assert.equal(domain[0], 0.1438);
  assert.equal(domain[1], 0.8769);
});

test('nice with ticks', function(assert) {
  assert.expect(5);
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100], nice: 10});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 0.9);
});

test('nice with ticks changed', function(assert) {
  assert.expect(5);
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('nice', 10);
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 0.9);
});

test('interpolate', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100], interpolate: d3.interpolateRound});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(5.476), 55);
});

test('interpolate changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,100]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('interpolate', d3.interpolateRound);
  assert.equal(scale(5.476), 55);
});

test('exponent', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,2048], exponent: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(5), 512);
});

test('exponent changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [0, 10], range: [0,2048]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('exponent', 2);
  assert.equal(scale(5), 512);
});
