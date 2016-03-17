import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('util:scales/d3-ordinal-scale', 'Unit | Utility | scales/d3 ordinal scale');

test('domain/range', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Two"), 1);
});

test('domain element changed', function(assert) {
  assert.expect(4);
  let domain = Ember.A(["One", "Two",]);
  let scaleObserver = this.subject({domain: domain, range: [0, 1, 2]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  domain.pushObject("Three");
  assert.equal(scale("Three"), 2);
});

test('domain changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('domain', ["X", "Y", "Z"]);
  assert.equal(scale("Y"), 1);
});

test('range element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 1]);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.pushObject(2);
  assert.equal(scale("Three"), 2);
});

test('range changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], range: [0, 1, 2]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('range', [3, 4, 5]);
  assert.equal(scale("Two"), 4);
});

test('rangePoints', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangePoints: [0, 10]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Two"), 5);
});

test('rangePoints element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 10]);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangePoints: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 5);
  assert.equal(scale("Three"), 5);
});

test('rangePoints changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangePoints: [0, 10]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('rangePoints', [0, 5]);
  assert.equal(scale("Three"), 5);
});

test('rangePoints with padding', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangePoints: [0, 10], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Three"), 7.5);
});

test('rangePoints with padding changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangePoints: [0, 10], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('padding', 0);
  assert.equal(scale("Three"), 10);
});

test('rangeRoundPoints', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeRoundPoints: [0, 10]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Two"), 5);
});

test('rangeRoundPoints element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 10]);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeRoundPoints: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 5);
  assert.equal(scale("Three"), 5);
});

test('rangeRoundPoints changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeRoundPoints: [0, 10]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('rangeRoundPoints', [0, 5]);
  assert.equal(scale("Three"), 5);
});

test('rangeRoundPoints with padding', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeRoundPoints: [0, 10], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Three"), 7);
});

test('rangeRoundPoints with padding changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeRoundPoints: [0, 10], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('padding', 0);
  assert.equal(scale("Three"), 10);
});

test('rangeBands', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeBands: [0, 9]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Two"), 3);
});

test('rangeBands element changed', function(assert) {
  assert.expect(4);
  let range = Ember.A([0, 10]);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeBands: range});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  range.replace(1, 1, 9);
  assert.equal(scale("Two"), 3);
});

test('rangeBands changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeBands: [0, 10]});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('rangeBands', [0, 9]);
  assert.equal(scale("Three"), 6);
});

test('rangeBands with padding', function(assert) {
  assert.expect(3);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeBands: [0, 10], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  assert.equal(scale("Three"), 8);
});

test('rangeBands with padding changed', function(assert) {
  assert.expect(4);
  let scaleObserver = this.subject({domain: ["One", "Two", "Three"], rangeBands: [0, 9], padding: 2});
  scaleObserver.addObserver('scale', function() {
    assert.ok(true);
  });

  let scale = scaleObserver.get('scale');
  scaleObserver.set('padding', 0);
  assert.equal(scale("Two"), 3);
});
