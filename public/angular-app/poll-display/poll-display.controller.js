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
    
    var votedPolls=getVotedPolls();
    
    if(votedPolls[$window.location.href]){
        vm.alreadyVoted=true;
    }else{
        vm.alreadyVoted=false;
    }
    
    
    function getVotedPolls(){
        
        return JSON.parse($window.localStorage['polls'] || '{}');
    }
    
    vm.vote=function(index){
        vm.poll.options[index].count++;
        var href="/api"+$window.location.href.split('#')[1];
        pollDataFactory.pollVote(href,vm.poll).then(function(res){
            //console.log(res);
            if(res.status!=204){
                vm.message=res.data;
            }else{
                votedPolls[$window.location.href]=true;
                $window.localStorage['polls'] = JSON.stringify(votedPolls);
                vm.alreadyVoted=true;
            }
        });
    };
    
    
}