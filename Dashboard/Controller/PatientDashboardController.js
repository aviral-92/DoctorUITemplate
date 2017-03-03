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

scotchApp.controller('patientProfile', function($scope,$cookieStore, fileReader) {
   
	 $scope.url = "#/patientProfile";
	    var getPatients = $cookieStore.get('loginData');
	    
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

	        if (getPatients.patientMobile == patientUpdateValue.patientMobile) {
	            delete patientUpdateValue.patientMobile;
	        }
	        if (getPatients.email == patientUpdateValue.email) {
	            delete patientUpdateValue.email;
	        }
	        if (getPatients.patientAadhaar == patientUpdateValue.patientAadhaar) {
	            delete patientUpdateValue.patientAadhaar;
	        }
	        var updatePatient = $http.put(
	            'https://patient-service.cfapps.io/patient/', patientUpdateValue);
	        updatePatient.success(function(updateResponse) {
	            $scope.successMessage = "Successfully Updated...!!!";
	            var patientSuccess = $http
	                .get('https://patient-service.cfapps.io/patient/get/' +
	                    $cookieStore.get('email') + '/email');
	            patientSuccess.success(function(data) {
	                $cookieStore.remove('loginData');
	                $cookieStore.put('loginData', data);
	            });
	            patientSuccess.error(function(data, status, headers, config) {});
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

