/*jshint node:true*/
module.exports = {
  description: ''

   afterInstall: function(options) {
     return this.addBowerPackageToProject('d3', '~3.5.16');
   }
};
