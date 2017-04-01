scotchApp.service('ajaxGetResponse', function($http){
    
   this.getAllExpertise = function(){
       var serverResponse = $http.get('https://doctors.cfapps.io/api/doctor/get/all/expertisation');
       return serverResponse;
   }
   
   this.putContactInfo = function(contactDetail){
       var serverResponse = $http.post('https://doctors.cfapps.io/api/misc/addContact', contactDetail);
       return serverResponse;
   } 
});