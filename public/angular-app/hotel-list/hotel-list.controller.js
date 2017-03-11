angular.module('meanhotel').controller('HotelsController',HotelsController);

function HotelsController($http){
    var vm=this;
    vm.title="MEAN Hotel App";
    $http.get('/api/hotels?count=10').then(function(res){
        vm.hotels=res.data;
    });
}