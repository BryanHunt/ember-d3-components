import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('axis');
  this.route('grid');
  this.route('text');
  this.route('line');
  this.route('circle');
  this.route('bar');
  this.route('arc');
  this.route('area');
});

export default Router;
