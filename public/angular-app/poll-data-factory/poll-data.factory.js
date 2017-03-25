angular.module('votingapp').factory('pollDataFactory',pollDataFactory);

function pollDataFactory($http){
    return{
        pollList:pollList,
        getPoll:getPoll,
        getPopular:getPopular
    };
    
    
    
    function pollList(){
        return $http.get('/api/polls').then(complete).catch(failed);
    }
    
    function getPoll(creator,poll){
        return $http.get('/api/'+creator+"/"+poll).then(complete).catch(failed);
    }
    
    function getPopular(creator,poll){
        return $http.get('/api/popular').then(complete).catch(failed);
    }
    
    function hotelDisplay(id){
        return $http.get('/api/hotels/'+id).then(complete).catch(failed);
    }
    
    
    
    function complete (res){
        return res;
    }
    function failed (err){
        return err;
    }
}