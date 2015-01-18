import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("x-y-plot");
  this.route("bar-plot");
});

export default Router;
