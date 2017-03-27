angular.module('votingapp').factory('pollDataFactory',pollDataFactory);

function pollDataFactory($http){
    return{
        pollList:pollList,
        getPoll:getPoll,
        getPopular:getPopular,
        pollVote:pollVote,
        deletePoll:deletePoll,
        updatePoll:updatePoll
    };
    
    
    
    function pollList(){
        return $http.get('/api/polls').then(complete).catch(failed);
    }
    
    function getPoll(creator,poll){
        
        return $http.get('/api/poll/'+creator+"/"+poll).then(complete).catch(failed);
    }
    
    function getPopular(){
        return $http.get('/api/popular').then(complete).catch(failed);
    }
    
    function pollVote(href,data){
        return $http.put(href,data).then(complete).catch(failed);
    }
    
    function updatePoll(href,data){
        return $http.post(href,data).then(complete).catch(failed);
    }
    
    function deletePoll(href){
        return $http.delete(href).then(complete).catch(failed);
    }
    
    function complete (res){
        return res;
    }
    function failed (err){
        return err;
    }
}