import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-time-scale', 'Unit | Utility | scales/d3 time scale');

test('domain/range', function(assert) {
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1,31]}).get('scale');
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('domain element changed', function(assert) {
  let domain = Ember.A([new Date(2016, 1, 1), new Date(2016, 1, 30)]);
  let scale = this.subject({domain: domain, range: [1, 31]}).get('scale');
  domain.replace(1, 1, new Date(2016, 1, 31));
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('domain changed', function(assert) {
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [new Date(2016, 1, 1), new Date(2016, 1, 31)]);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range element changed', function(assert) {
  let range = Ember.A([1, 100]);
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: range}).get('scale');
  range.replace(1, 1, 31);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range changed', function(assert) {
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [1, 31]);
  assert.equal(scale(new Date(2016, 1, 15)), 15);
});

test('range round', function(assert) {
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], rangeRound: [1, 31]}).get('scale');
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('range round element changed', function(assert) {
  let range = Ember.A([1, 100]);
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], rangeRound: range}).get('scale');
  range.replace(1, 1, 31);
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('interpolate', function(assert) {
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31], interpolate: d3.interpolateRound}).get('scale');
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('interpolate changed', function(assert) {
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('interpolate', d3.interpolateRound);
  assert.equal(scale(new Date(2016, 1, 15, 3, 30, 0)), 15);
});

test('clamp', function(assert) {
  let scale = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31], clamp: true}).get('scale');
  assert.ok(scale(new Date(2016, 2, 1)) < 31);
});

test('clamp changed', function(assert) {
  let scaleObserver = this.subject({domain: [new Date(2016, 1, 1), new Date(2016, 1, 31)], range: [1, 31]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('clamp', true);
  assert.ok(scale(new Date(2016, 2, 1)) < 31);
});
