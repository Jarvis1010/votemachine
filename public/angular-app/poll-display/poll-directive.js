angular.module('votingapp').directive("editPoll",editPoll);

function editPoll(){
    return {
        restrict:'E',
        templateUrl:'/angular-app/poll-display/poll-directive.html',
        controller:PollController,
        controllerAs:'vm'
    };
}