import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-log-scale', 'Unit | Utility | d3 log scale');

test('domain/range', function(assert) {
  let scale = this.subject({domain: [1, 10], range: [0,100]}).get('scale');
  assert.equal(scale(10), 100);
});

test('domain element changed', function(assert) {
  let domain = Ember.A([1, 10]);
  let scale = this.subject({domain: domain, range: [0,100]}).get('scale');
  domain.replace(1, 1, 100);
  assert.equal(scale(100), 100);
});

test('domain changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [1, 100]);
  assert.equal(scale(100), 100);
});

test('range element changed', function(assert) {
  let range = Ember.A([0, 100]);
  let scale = this.subject({domain: [1,10], range: range}).get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(10), 10);
});

test('range changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [1, 10]);
  assert.equal(scale(10), 10);
});

test('base', function(assert) {
  let scale = this.subject({domain: [1, 10], range: [0,100], base: 2}).get('scale');
  assert.equal(scale(10), 100);
});

test('clamp', function(assert) {
  let scale = this.subject({domain: [1, 10], range: [0,100], clamp: true}).get('scale');
  assert.equal(scale(20), 100);
});

test('clamp changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('clamp', true);
  assert.equal(scale(20), 100);
});

test('range round', function(assert) {
  let scale = this.subject({domain: [1, 10], rangeRound: [0,100]}).get('scale');
  assert.equal(scale(5.3), 72);
});

test('range round element changed', function(assert) {
  let range = Ember.A([0, 100]);
  let scale = this.subject({domain: [1,10], rangeRound: range}).get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(5.3), 7);
});

test('nice', function(assert) {
  let scale = this.subject({domain: [0.1438, 0.8769], range: [0,100], nice: true}).get('scale');
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 1);
});

test('nice changed', function(assert) {
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('nice', true);
  let domain = scale.domain();
  assert.equal(domain[0], 0.1);
  assert.equal(domain[1], 1);
});

test('nice changed', function(assert) {
  let scaleObserver = this.subject({domain: [0.1438, 0.8769], range: [0,100], nice: true});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('nice', false);
  let domain = scale.domain();
  assert.equal(domain[0], 0.1438);
  assert.equal(domain[1], 0.8769);
});

test('interpolate', function(assert) {
  let scale = this.subject({domain: [1, 10], range: [0,100], interpolate: d3.interpolateRound}).get('scale');
  assert.equal(scale(5.476), 74);
});

test('interpolate changed', function(assert) {
  let scaleObserver = this.subject({domain: [1, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('interpolate', d3.interpolateRound);
  assert.equal(scale(5.476), 74);
});
