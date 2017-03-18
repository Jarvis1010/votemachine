
angular.module('meanhotel').component('hotelRating',{
    bindings:{
        stars:'@'
    },
    template:'<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>',
    controller:"HotelController",
    controllerAs:"vm"
});