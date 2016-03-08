import Ember from 'ember';
import D3LinearScale from 'dummy/utils/scales/d3-linear-scale';
import { module, test } from 'qunit';

module('Unit | Utility | scales/d3 linear scale');

test('domain/range', function(assert) {
  let scale = D3LinearScale.create({domain: [0, 10], range: [0,100]}).get('scale');
  assert.equal(scale(5), 50);
});

test('domain element changed', function(assert) {
  let domain = Ember.A([0, 10]);
  let scale = D3LinearScale.create({domain: domain, range: [0,100]}).get('scale');
  domain.replace(1, 1, 100);
  assert.equal(scale(50), 50);
});

test('domain changed', function(assert) {
  let scaleObserver = D3LinearScale.create({domain: [0, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [0, 100]);
  assert.equal(scale(50), 50);
});

test('range element changed', function(assert) {
  let range = Ember.A([0, 100]);
  let scale = D3LinearScale.create({domain: [0,10], range: range}).get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(5), 5);
});

test('range changed', function(assert) {
  let scaleObserver = D3LinearScale.create({domain: [0, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [0, 10]);
  assert.equal(scale(5), 5);
});

test('clamp', function(assert) {
  let scale = D3LinearScale.create({domain: [0, 10], range: [0,100], clamp: true}).get('scale');
  assert.equal(scale(20), 100);
});

test('clamp changed', function(assert) {
  let scaleObserver = D3LinearScale.create({domain: [0, 10], range: [0,100]});
  let scale = scaleObserver.get('scale');
  scaleObserver.set('clamp', true);
  assert.equal(scale(20), 100);
});

test('range round', function(assert) {
  let scale = D3LinearScale.create({domain: [0, 10], rangeRound: [0,100]}).get('scale');
  assert.equal(scale(5.476), 55);
});

test('range round element changed', function(assert) {
  let range = Ember.A([0, 100]);
  let scale = D3LinearScale.create({domain: [0,10], rangeRound: range}).get('scale');
  range.replace(1, 1, 10);
  assert.equal(scale(5.3257), 5);
});

//TODO: test('nice', function() {});
//TODO: test('nice changed', function() {});
//TODO: test('niceTickCount', function() {});
//TODO: test('niceTickCount changed', function() {});
//TODO: test('interpolate', function() {});
//TODO: test('interpolate changed', function() {});
