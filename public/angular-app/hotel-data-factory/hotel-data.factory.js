angular.module('meanhotel').factory('hotelDataFactory',hotelDataFactory);

function hotelDataFactory($http){
    return{
        hotelList:hotelList,
        hotelDisplay:hotelDisplay
    };
    
    
    
    function hotelList(){
        return $http.get('/api/hotels').then(complete).catch(failed);
    }
    function hotelDisplay(id){
        return $http.get('/api/hotels/'+id).then(complete).catch(failed);
    }
    
    function complete (res){
        return res;
    }
    function failed (err){
        console.log(err.statusText);
    }
}