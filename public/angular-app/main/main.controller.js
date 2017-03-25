angular.module('votingapp').controller('MainController',MainController);

function MainController(Authfactory,pollDataFactory){
    var vm=this;
    
    vm.polls=[];
    
    if(Authfactory.isLoggedIn){
        vm.loggedInUser='';
        pollDataFactory.pollList().then(function(res){
            
            vm.creator=res.data.creator;
            vm.polls=res.data.pollTitles;
        });
    }else{
        pollDataFactory.getPopular().then(function(res){
            //console.log(res.data);
            vm.creator=res.data[0].creator;
            vm.polls=res.data;
        });
    }
    
    vm.isLoggedIn=function(){
        if(Authfactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    };
    
}