import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-quantile-scale', 'Unit | Utility | scales/d3 quantile scale');

test('domain/range', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale(2), "white");
});

test('domain element changed', function(assert) {
  assert.expect(4);
  let domain = Ember.A([1, 2, 3]);
  let scaleObserver = this.subject({domain: domain, range: ["blue", "white", "red"]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  domain.replace(1, 1, 5);
  assert.equal(scale(5), "red");
});

test('domain changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', [4, 5, 6]);
  assert.equal(scale(5), "white");
});

test('range element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A(["blue", "white", "red"]);
  let scaleObserver = this.subject({domain: [1, 2, 3], range: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, "gold");
  assert.equal(scale(2), "gold");
});

test('range changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: [1, 2, 3], range: ["blue", "white", "red"]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', ["blue", "gold", "red"]);
  assert.equal(scale(2), "gold");
});
