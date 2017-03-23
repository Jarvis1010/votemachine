angular.module('votingapp').factory('pollDataFactory',pollDataFactory);

function pollDataFactory($http){
    return{
        pollList:pollList
    };
    
    
    
    function pollList(){
        return $http.get('/api/polls').then(complete).catch(failed);
    }
    function hotelDisplay(id){
        return $http.get('/api/hotels/'+id).then(complete).catch(failed);
    }
    
    function postReview(id,review){
        return $http.post('/api/hotels/'+id+"/reviews",review).then(complete).catch(failed);
    }
    
    function complete (res){
        return res;
    }
    function failed (err){
        console.log(err.statusText);
    }
}