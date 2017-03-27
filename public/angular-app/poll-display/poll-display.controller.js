angular.module('votingapp').controller('PollController',PollController);

function PollController($location,$window,pollDataFactory, $routeParams,$route,jwtHelper){
    //start loading google charts
    google.charts.load('current', {'packages':['corechart']});
    
    var vm=this;
    var creator=$routeParams.creator;
    var title=encodeURIComponent($routeParams.title);
    var votedPolls=pollsAlreadyVoted();
    
    vm.editMode=false;
    vm.isMyPoll=false;
   
    if(votedPolls[$window.location.href]){
        vm.alreadyVoted=true;
    }else{
        vm.alreadyVoted=false;
    }
    
    
    pollDataFactory.getPoll(creator,title).then(function(res){
        if(res.status!=200){
            vm.errorMessage=res.data;
        }else{
            vm.poll =res.data;
            vm.drawChart(vm.poll);
            checkPollOwner();
        }
    });
    
    vm.toggleEditMode=function(){
        vm.editMode=!vm.editMode;
    };
    
    vm.cancelEdit=function(){
        $route.reload();
    };
    
    vm.addOption=function(){
        vm.poll.options.push({option:'',count:0});
    };
    
    vm.deleteOption=function(index){
        if(vm.poll.options.length>2){
            vm.poll.options.splice(index,1);
        }    
    };
 
    vm.deletePoll=function(){
        var creator=vm.poll.creator;
        var title = vm.poll.title;
        pollDataFactory.deletePoll(creator,title).then(function(res){
            if(res.status!=204){
            vm.errorMessage=res.data;
        }else{
            $location.path('/');
            
        }
        });
    };
    
    vm.savePoll=function(){
        
    };
    
    vm.drawChart=function(poll) {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Poll Option');
        data.addColumn('number', 'Votes');
        var pollData = poll.options.map(function(option){
            return [option.option,option.count];
        });
        
        data.addRows(pollData);

        // Set chart options
        var options = {'title':vm.poll.title,'width':'100%','height':400};

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      };
    
    
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
               $route.reload();
               
            }
        });
    };
    
    function pollsAlreadyVoted(){
        
        return JSON.parse($window.localStorage['polls'] || '{}');
    }
    
    function checkPollOwner(){
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        
        if(decodedToken.hasOwnProperty('username')&&decodedToken.username===vm.poll.creator){
           vm.isMyPoll= true; 
        }else{
            vm.isMyPoll= false;
        }    
    }
    
}