import Accessor from 'dummy/utils/d3-data-accessor';
import { module, test } from 'qunit';

module('Unit | Utility | d3-data-accessor');

test('default name', function(assert) {
  let accessor = Accessor.create();
  let data = { value: 10 };
  assert.equal(accessor.extract(data), 10);
});

test('specified name', function(assert) {
  let accessor = Accessor.create({name: "y"});
  let data = { y: 10 };
  assert.equal(accessor.extract(data), 10);
});

test('custom extractor', function(assert) {
  let accessor = Accessor.create({extract: function(dataPoint) {
    return dataPoint[this.get('name')] + 1;
  }});
  let data = { value: 10 };
  assert.equal(accessor.extract(data), 11);
});
