import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("xyplot");
  this.route("barplot");
  this.route("areaplot");
  this.route("bubbleplot");
});

export default Router;
