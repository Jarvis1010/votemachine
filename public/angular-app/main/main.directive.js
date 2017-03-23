angular.module('votingapp').directive("dashBoard",dashBoard);

function dashBoard(){
    return {
        restrict:'E',
        templateUrl:'/angular-app/main/main.directive.html',
        controller:MainController,
        controllerAs:'vm'
    };
}