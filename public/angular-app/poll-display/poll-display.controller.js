angular.module('votingapp').controller('PollController',PollController);

function PollController($location,$window,pollDataFactory, $routeParams,$route,jwtHelper){
    var vm=this;
    var creator=$routeParams.creator;
    var title=encodeURIComponent($routeParams.title);
   
    vm.isMyPoll=false;
    
    function checkPollOwner(){
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        
        if(decodedToken.hasOwnProperty('username')&&decodedToken.username===vm.poll.creator){
           vm.isMyPoll= true; 
        }else{
            vm.isMyPoll= false;
        }    
    }
   
    google.charts.load('current', {'packages':['corechart']});
    
    pollDataFactory.getPoll(creator,title).then(function(res){
        if(res.status!=200){
            vm.errorMessage=res.data;
        }else{
            vm.poll =res.data;
            vm.drawChart(vm.poll);
            checkPollOwner();
        }
    });
    
    var votedPolls=pollsAlreadyVoted();
    
   
    if(votedPolls[$window.location.href]){
        vm.alreadyVoted=true;
    }else{
        vm.alreadyVoted=false;
    }
 
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
    
    function pollsAlreadyVoted(){
        
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
               $route.reload();
               
            }
        });
    };
    
    
}