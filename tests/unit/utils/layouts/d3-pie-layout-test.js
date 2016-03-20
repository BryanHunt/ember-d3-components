import { moduleFor, test } from 'ember-qunit';

moduleFor('util:layouts/d3-pie-layout', 'Unit | Utility | scales/d3 pie layout');

test('default pie', function(assert) {
  let layout = this.subject().get('layout');
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.ok(pieData[0].endAngle > 3.14159265);
  assert.ok(pieData[0].endAngle < 3.14159266);
  assert.equal(pieData[0].padAngle, 0);
});

test('value', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject({value: function(d) { return d.v;}});
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [{v: 50}, {v: 50}];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.ok(pieData[0].endAngle > 3.14159265);
  assert.ok(pieData[0].endAngle < 3.14159266);
  assert.equal(pieData[0].padAngle, 0);
});

test('value changed', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('value', function(d) { return d.v;});
  let data = [{v: 50}, {v: 50}];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.ok(pieData[0].endAngle > 3.14159265);
  assert.ok(pieData[0].endAngle < 3.14159266);
  assert.equal(pieData[0].padAngle, 0);
});

test('sort', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject({sort: d3.ascending});
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [90, 10];
  let pieData = layout(data);
  assert.equal(pieData[1].startAngle, 0);
  assert.ok(pieData[1].endAngle > 0.62831853);
  assert.ok(pieData[1].endAngle < 0.62831854);
  assert.equal(pieData[1].padAngle, 0);
});

test('sort changed', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('sort', d3.ascending);
  let data = [90, 10];
  let pieData = layout(data);
  assert.equal(pieData[1].startAngle, 0);
  assert.ok(pieData[1].endAngle > 0.62831853);
  assert.ok(pieData[1].endAngle < 0.62831854);
  assert.equal(pieData[1].padAngle, 0);
});

test('startAngle', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject({startAngle: 1});
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 1);
  assert.ok(pieData[0].endAngle > 3.641592653);
  assert.ok(pieData[0].endAngle < 3.641592654);
  assert.equal(pieData[0].padAngle, 0);
});

test('startAngle changed', function(assert) {
  assert.expect(5);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('startAngle', 1);
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 1);
  assert.ok(pieData[0].endAngle > 3.641592653);
  assert.ok(pieData[0].endAngle < 3.641592654);
  assert.equal(pieData[0].padAngle, 0);
});

test('endAngle', function(assert) {
  assert.expect(4);
  let layoutObserver = this.subject({endAngle: 6});
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.equal(pieData[1].endAngle, 6);
  assert.equal(pieData[0].padAngle, 0);
});

test('endAngle changed', function(assert) {
  assert.expect(4);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('endAngle', 6);
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.equal(pieData[1].endAngle, 6);
  assert.equal(pieData[0].padAngle, 0);
});

test('padAngle', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject({padAngle: 1});
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.equal(pieData[0].padAngle, 1);
});

test('endAngle changed', function(assert) {
  assert.expect(3);
  let layoutObserver = this.subject();
  layoutObserver.addObserver('layout', function() {
    assert.ok(true);
  });

  let layout = layoutObserver.get('layout');
  layoutObserver.set('padAngle', 1);
  let data = [50, 50];
  let pieData = layout(data);
  assert.equal(pieData[0].startAngle, 0);
  assert.equal(pieData[0].padAngle, 1);
});
