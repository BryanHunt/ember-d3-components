import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  translation: computed('translateX', 'translateY', function() {
    return `translate(${this.get('translateX')}, ${this.get('translateY')})`;
  })
});
