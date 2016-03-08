import { moduleFor, test } from 'ember-qunit';

moduleFor('util:d3-data-accessor', 'Unit | Utility | d3-data-accessor');

test('default name', function(assert) {
  let accessor = this.subject();
  let data = { value: 10 };
  assert.equal(accessor.extract(data), 10);
});

test('specified name', function(assert) {
  let accessor = this.subject({name: "y"});
  let data = { y: 10 };
  assert.equal(accessor.extract(data), 10);
});

test('custom extractor', function(assert) {
  let accessor = this.subject({extract: function(dataPoint) {
    return dataPoint[this.get('name')] + 1;
  }});
  let data = { value: 10 };
  assert.equal(accessor.extract(data), 11);
});
