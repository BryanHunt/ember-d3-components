import { moduleFor, test } from 'ember-qunit';

moduleFor('util:layouts/d3-stack-layout', 'Unit | Utility | scales/d3 stack layout');

test('default stack', function(assert) {
  let layout = this.subject().get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 0);
  assert.equal(stackedData[1][0].y0, 1);
});

test('values', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({values: function(d) {
    return d.values;
  }});

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [{values: [{x: 0, y: 1}]}, {values: [{x: 0, y: 1}]}];
  let stackedData = layout(data);
  assert.equal(stackedData[0].values[0].y0, 0);
  assert.equal(stackedData[1].values[0].y0, 1);
});

test('values changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [{values: [{x: 0, y: 1}]}, {values: [{x: 0, y: 1}]}];
  layoutObserver.set('values', function(d) {
    return d.values;
  });

  let stackedData = layout(data);
  window.console.log(stackedData);
  assert.equal(stackedData[0].values[0].y0, 0);
  assert.equal(stackedData[1].values[0].y0, 1);
});

test('offset', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({offset: "expand"});

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 0);
  assert.equal(stackedData[1][0].y0, 0.5);
});

test('offset changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  layoutObserver.set('offset', 'expand');
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 0);
  assert.equal(stackedData[1][0].y0, 0.5);
});

test('order', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({order: "reverse"});

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 1);
  assert.equal(stackedData[1][0].y0, 0);
});

test('order changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('order', "reverse");
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 1);
  assert.equal(stackedData[1][0].y0, 0);
});

test('y', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({y: function(d) { return d.r; }});

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, r: 1}], [{x: 0, r: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 0);
  assert.equal(stackedData[1][0].y0, 1);
});

test('y changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, r: 1}], [{x: 0, r: 1}]];
  layoutObserver.set('y', function(d) { return d.r; });
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].y0, 0);
  assert.equal(stackedData[1][0].y0, 1);
});

test('out', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({
    out: function(d, y0, y) {
      d.r0 = y0;
      d.y = y;
    }
  });

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];
  let stackedData = layout(data);
  assert.equal(stackedData[0][0].r0, 0);
  assert.equal(stackedData[1][0].r0, 1);
});

test('out changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();

  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [[{x: 0, y: 1}], [{x: 0, y: 1}]];

  layoutObserver.set('out', function(d, y0, y) {
    d.r0 = y0;
    d.y = y;
  });

  let stackedData = layout(data);
  assert.equal(stackedData[0][0].r0, 0);
  assert.equal(stackedData[1][0].r0, 1);
});
