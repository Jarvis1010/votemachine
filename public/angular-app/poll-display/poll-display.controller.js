angular.module('votingapp').controller('PollController',PollController);

function PollController($window,pollDataFactory, $routeParams,$route){
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
    
    
    vm.vote=function(index){
        vm.poll.options[index].count++;
        var href="/api"+$window.location.href.split('#')[1];
        pollDataFactory.pollVote(href,vm.poll).then(function(res){
            console.log(res);
        });
    };
    
    
}