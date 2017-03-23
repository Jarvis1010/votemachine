angular.module('votingapp').controller('MainController',MainController);

function MainController(Authfactory){
    var vm=this;
    
    vm.polls=['Cras justo odio','Dapibus ac facilisis in','Morbi leo risus','Porta ac consectetur ac','Vestibulum at eros','Cras justo odio','Dapibus ac facilisis in'];
    
    vm.isLoggedIn=function(){
        if(Authfactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    };
    
}