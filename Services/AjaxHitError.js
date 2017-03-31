scotchApp.service('ajaxErrorControl', function($mdDialog){
    
   this.ajaxServiceDown = function(){
       $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Service Down for Maintainance')
                     .textContent('We will be back in a while')
                     .ariaLabel('We will be back in a while')
                     .ok('Ok!')
            );
   } 
});