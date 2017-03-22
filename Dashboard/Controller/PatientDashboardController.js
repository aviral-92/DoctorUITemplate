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

/*scotchApp.controller('patientupdateProfile',function($scope, $rootScope, $http, $cookieStore){
	 var paitentDetails = $cookieStore.get('patientLoginData');
    $scope.patients = paitentDetails;
	$scope.patientUpdate = function(patientUpdateValue){
		console.log(patientUpdateValue);
         Logic to remove fields if not updated 
        
        var patient;
        if(patientUpdateValue.name != paitentDetails.name){
            patient.name = patientUpdateValue.name;
        }
        if(patientUpdateValue.adhaar != paitentDetails.adhaar){
            patient.adhaar = patientUpdateValue.adhaar;
        }
        if(patientUpdateValue.allergies != paitentDetails.allergies){
            patient.allergies = patientUpdateValue.allergies;
        }
        if(patientUpdateValue.dob != paitentDetails.dob){
            patient.dob = patientUpdateValue.dob;
        }
        if(patientUpdateValue.email != paitentDetails.email){
            patient.email = patientUpdateValue.email;
        }
        if(patientUpdateValue.gender != paitentDetails.gender){
            patient.gender = patientUpdateValue.gender;
        }
        if(patientUpdateValue.homeAddress != paitentDetails.homeAddress){
            patient.homeAddress = patientUpdateValue.homeAddress;
        }
        if(patientUpdateValue.mobile != paitentDetails.mobile){
            patient.mobile = patientUpdateValue.mobile;
        }
        if(patientUpdateValue.password != undefined && patientUpdateValue.password == patientUpdateValue.confirmPassward){
            patient.password = patientUpdateValue.password;
        }
        patient.pId;
        
         Logic to remove fields if not updated 
		var updatepatient = $http.put('https://doctors.cfapps.io/api/patient/', patient);
		updatepatient.success(function(updateResponse) {
			$scope.successMessage = "Successfully Updated...!!!";
			var patientSuccess = $http.get('https://doctors.cfapps.io/api/patient/get/'+patients.patientEmail+'/email');
			patientSuccess.success(function(data) {
//				alert("dfdfdf");
				console.log(data.mobile);
				$cookieStore.remove('patientLoginData');
				$cookieStore.put('patientLoginData', data);
			});
			patientSuccess.error(function(data, status, headers, config) {
			});
		});
		updatepatient.error(function(updateResponse, status, headers, config) {
			alert("failure message: " + updateResponse.message);
		});
	}
	$scope.doBlurName = function($event){
		var target = $event.target;
		if($scope.patients != null && $scope.patients.patientName.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
	}
	$scope.doBlurMobile = function($event){
		var target = $event.target;
		if($scope.patients != null && $scope.patients.patientMobile != null && $scope.patients.patientMobile.length == 10){
			target.blur();	
		}else{
			target.focus();
		}
	}
	$scope.doBlurHomeAddress = function($event){
		var target = $event.target;
		if($scope.patients != null && $scope.patients.patientHomeAddress != null && $scope.patients.patientHomeAddress.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
	}
});*/

scotchApp.controller('patientAppointment', function($scope, $http) {
	
});

scotchApp.controller('patientNewAppointment', function($scope, $http) {
	
});


scotchApp.controller('patientHistory', function($scope, $http) {
	
});