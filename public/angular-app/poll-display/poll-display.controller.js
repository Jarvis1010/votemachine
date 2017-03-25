angular.module('votingapp').controller('PollController',PollController);

function PollController(pollDataFactory, $routeParams,$route){
    var vm=this;
    var creator=$routeParams.creator;
    var title=encodeURIComponent($routeParams.title);
   
    
    pollDataFactory.getPoll(creator,title).then(function(res){
        if(res.status!=200){
            vm.errorMessage=res.data;
        }else{
            vm.poll =res.data;
        }
    });
    
    
}