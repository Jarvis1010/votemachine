angular.module('votingapp').directive("navBar",NavBar);

function NavBar(){
    return {
        restrict:'E',
        templateUrl:'/angular-app/navigation-directive/navigation-directive.html',
        controller:LoginController,
        controllerAs:'vm'
    };
}