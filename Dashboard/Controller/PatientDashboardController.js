scotchApp.controller('index', function($scope, $http, $cookieStore, $mdDialog, $window, $interval) {
    
    var getPatients = $cookieStore.get('patientLoginData');
    $scope.name = getPatients.name;
    // need to add membership like created date.
    $scope.url = getPatients.src;
    console.log(getPatients);
    getNotification(getPatients);
    getMessages(getPatients);
    
    $scope.getNotofication = function(notify){
        
        $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title(notify.notiyfMessage)
                     .textContent(notify.notiyfMessage)
                     .ariaLabel(notify.notiyfMessage)
                     .ok('Ok!')
            );
        var obj = {
            "notifyId" : notify.notifyId
        }; // Create new object
        var notifys = JSON.stringify(obj)
        console.log(notifys);
        var responseUpdate = $http.put('https://doctors.cfapps.io/api/notification/updateNotify', notifys);
            responseUpdate.success(function(data){
                console.log('success');
                getNotification(getPatients);
            });
            responseUpdate.error(function(data, status, headers, config){
                console.log('failure');
                getNotification(getPatients);
            });
    }
    
    $scope.getMessage = function(messages){
        
        $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title(messages.message)
                     .textContent(messages.message)
                     .ariaLabel(messages.message)
                     .ok('Ok!')
            );
        
        /*var obj = {
            "notifyId" : notify.notifyId
        }; // Create new object
        var notifys = JSON.stringify(obj)
        console.log(notifys);*/
        var responseUpdate = $http.put('https://doctors.cfapps.io/api/message/updatemessage', messages);
            responseUpdate.success(function(data){
                console.log('success');
                getMessages(getPatients);
            });
            responseUpdate.error(function(data, status, headers, config){
                console.log('failure');
                getMessages(getPatients);
            });
    }   
    
    //Function for rest hit to get notofication array...
    function getNotification(patients){
        var response = $http.get('https://doctors.cfapps.io/api/notification/getNotifyforpatient/'+patients.pId+'/pId');
        response.success(function(notification){
            $scope.notificationCount = notification.length;
            console.log(notification);
            $scope.notifications = notification;
        });
        response.error(function(data, status, headers, config) { 
            alert('Failure');
        });
        console.log('Notification function over');
    }
    
    function getMessages(patients){
        var response = $http.get('https://doctors.cfapps.io/api/message/getmessageforpatient/'+patients.pId+'/pId');
        response.success(function(messages){
            $scope.messageCount = messages.length;
            console.log(messages);
            $scope.messages = messages;
        });
        response.error(function(data, status, headers, config) { 
            alert('Failure');
        });
        console.log('Message function over');
    }
});

scotchApp.controller('patientHome', function($scope, $http) {
	$scope.visible = false;
    var index = 0;
    $scope.url = "#/patientHome";
    var todo = $http.get('/js/MockJson/todoList.json');
    todo.success(function(todoData) {
        $scope.todoList = todoData;
    });
    $scope.close = function(){
        var data = $scope.todoTastData;
        $scope.todoList.push({
            "message":data
        });
        $scope.todoTastData = '';
    }
});

scotchApp.controller('patientProfile', function($scope,$cookieStore, fileReader, $http, $window, $mdDialog, $interval) {
   
	 $scope.url = "#/patientProfile";
	    var getPatients = $cookieStore.get('patientLoginData');
	    
	    $scope.patients = getPatients
	    $scope.patients.dob = new Date($scope.patients.dob);
	    
	    $scope.uploadPicture = function () {
	        var fileInput = document.getElementById('uploadFile');
	        fileInput.click();
	      };
	      
	      
	      $scope.getFile = function () {
	        fileReader.readAsDataUrl($scope.file, $scope)
	            .then(function (result) {
	              $scope.patients.src = result;
	            console.log($scope.file);
	            });
	      };
	      
	    $scope.patients = getPatients
	    $scope.patientUpdate = function(patientUpdateValue) {
	        console.log(patientUpdateValue);

	        if ($cookieStore.get('patientLoginData').mobile == patientUpdateValue.mobile) {
	            delete patientUpdateValue.mobile;
	        }
	        if (getPatients.email == patientUpdateValue.email) {
	            delete patientUpdateValue.email;
	        }
	        if (getPatients.adhaar == patientUpdateValue.adhaar) {
	            delete patientUpdateValue.adhaar;
	        }
	        var updatePatient = $http.put(
	            'https://doctors.cfapps.io/api/patient/', patientUpdateValue);
	        updatePatient.success(function(updateResponse) {
	            $scope.successMessage = "Successfully Updated...!!!";
	            var patientSuccess = $http
	                .get('https://doctors.cfapps.io/api/patient/get/'+ $cookieStore.get('patientLoginData').email +'/email');
	            patientSuccess.success(function(data) {
	                $cookieStore.remove('patientLoginData');
	                $cookieStore.put('patientLoginData', data);
                    
                    // Waiting for 5.5s so that it alert can show and it will load automatically after timeout...
                    $interval(callAtInterval,5500);
                    
                    
                   $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Paitent Updated')
                     .textContent('Patient updated successfully...!!!')
                     .ariaLabel('Patient updated successfully...!!!')
                     .ok('Ok!')
                     
               );
            
                    function callAtInterval() {
                        console.log("Interval occurred");
                        $window.location.reload();
                        console.log("Interval finished");
                    }
                    
                    
	            });
	            patientSuccess.error(function(data, status, headers, config) {
                    
                });
	        });
	        updatePatient.error(function(updateResponse, status, headers, config) {
	            alert("failure message: " + updateResponse.message);
	        });
	    }
	    
	    //Calucate Age of Patient
	    var age = new Date().getYear() - new Date($scope.patients.dob).getYear();
	    $scope.patients.age = age;
	  //Calculate percentage dynamically...
	    if (getPatients != null) {
	            var field = 5;
	            if (getPatients.patientHomeAddress != null &&
	            		getPatients.patientHomeAddress != 'NA') {
	                field++;
	            }
	            if (getPatients.dob != null &&
	            		getPatients.dob != 'NA') {
	                field++;
	            }
	            if (getPatients.gender != null &&
	            		getPatients.gender != 'NA') {
	                field++;
	            }
	            if (getPatients.age != null &&
	            		getPatients.age != 'NA') {
	                field++;
	            }
	            if (getPatients.description != null &&
	            		getPatients.description != 'NA') {
	                field++;
	            }
	            if (getPatients.allergies != null &&
	            		getPatients.allergies != 'NA') {
	                field++;
	            }
	            $scope.percent = parseInt((field / 11) * 100) + '%';
	        }
});

scotchApp.factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: '../../Dashboard/calender/PatientModalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };
  });

scotchApp.controller('KitchenSinkCtrl', function(moment, alert, calendarConfig) {

    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    vm.events = [
      {
        title: 'An event ',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'This is a really long event title that occurs on every year',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true,
        actions: actions
      }
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {
        // Push will be used to push in array of events.
        //so we will save array in the last in db so that all the operations got over.
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });

scotchApp.controller('patientAppointment', function($scope, $http, $rootScope) {
	
    var getDoctor = $rootScope.doctorObj;
    console.log(getDoctor);
    $scope.doctor = getDoctor;
    
});

scotchApp.controller('patientHistory', function($scope, $http, $window) {
	
     $scope.btnClick = function() {
        $window.location.href = '#/patientAppointment';
        console.log($scope.dirty.value);
         
    }
    
});
scotchApp.controller('patientNewAppointment', function($scope,$rootScope, $http, $q, filterFilter, $location) {

    $scope.searchResult = false;
    $scope.spinner = false;
    var foodArray = [];
    $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(expertise) {
        foodArray = expertise;
    });

    var vm = this;
    // The following are used in md-autocomplete
    vm.selectedItem = null;
    vm.searchText = null;
    vm.selectedFoods = [];
    vm.transformChip = transformChip;

    vm.querySearchDeferred = querySearchDeferred;

    function transformChip(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
            return chip;
        }
    }

    function querySearchDeferred(query) {
        var deferred = $q.defer();

        setTimeout(function() {
            if (query) {
                deferred.resolve(filterFilter(foodArray, query));
            } else {
                deferred.reject([{
                    country: 'None'
                }]);
            }
        }, 200);
        return deferred.promise;
    }
    
     $scope.btnClick = function(item) {
//        $window.location.href = '#/patientHistory';
         
         var obj = {"expertized" : item[0]}
         var expertise = JSON.stringify(obj);
         console.log(expertise);
         
         var response = $http.post('https://doctors.cfapps.io/api/doctor/get/all', expertise);
         $scope.spinner = true;
         response.success(function(doctorsList){
                $scope.spinner = false;
                console.log(doctorsList);
                $scope.doctors = doctorsList;
        });
        response.error(function(data, status, headers, config) { 
            alert('Failure');
            $scope.spinner = false;
        });
         
         $scope.searchResult = true;

    }
     
     $scope.viewDoctor = function(doctor){
         
         console.log(doctor);
         $rootScope.doctorObj = doctor;
         $location.path('/patientAppointment');
     }
      
});
 