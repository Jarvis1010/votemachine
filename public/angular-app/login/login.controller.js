angular.module('votingapp').controller('LoginController',LoginController);

function LoginController($route,$http,$location,$window,Authfactory,jwtHelper){
    var vm=this;
    
    vm.loggedinUser='';
    
    if(Authfactory.isLoggedIn){
        updateUserName();
    }
    
    vm.isLoggedIn=function(){
        if(Authfactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    };
    
    vm.login=function(){
        if(vm.username&&vm.password){
            var user={
                username:vm.username,
                password:vm.password
            };
            
            $http.post('/api/users/login',user).then(function(res){
               if(res.data.success){
                    $window.sessionStorage.token=res.data.token;
                    Authfactory.isLoggedIn=true;
                    updateUserName();
                    $location.path('/');
               }    
            }).catch(function(err){
                console.log(err);
            });
        }
    };
    
    vm.logout=function(){
        delete $window.sessionStorage.token;
        Authfactory.isLoggedIn=false;
        $location.path('/');
        $route.reload();
    };
    
    vm.isActiveTab=function(url){
        var currentPath=$location.path().split('/')[1];
        return (url=== currentPath? 'active':"");
    }
    
    function updateUserName(){
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedinUser=decodedToken.username;
    }
}