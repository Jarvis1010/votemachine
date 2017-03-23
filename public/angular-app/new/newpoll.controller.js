angular.module('votingapp').controller('NewpollController',NewpollController);

function NewpollController($http,$location){
    var vm=this;
    
    vm.poll={title:'',options:['','']};
    
    vm.addOption=function(){
      vm.poll.options.push('');  
    };
    
    vm.deleteOption=function(){
      if(vm.poll.options.length>2){
        vm.poll.options.pop();  
      }    
    };
    
    vm.submitPoll=function(){
        $http.post('/api/polls',vm.poll).then(function(data){
            $location.path('/');
        }).catch(function(err){
            console.log(err);
        });
    };
    
    
}