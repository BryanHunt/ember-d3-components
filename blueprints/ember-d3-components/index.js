/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('d3', '~3.5.16');
  }
};
