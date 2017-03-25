angular.module('votingapp').filter('escape', function() {
  return window.encodeURIComponent;
});