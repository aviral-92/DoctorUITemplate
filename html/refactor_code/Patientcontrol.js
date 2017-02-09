scotchApp.controller('patientlogin',function($scope, $rootScope, $http, $cookieStore, $window){
	
	if($cookieStore.get('loginData') == undefined || $cookieStore.get('email') == undefined){
		$scope.patientLogin = function(loginDetails){
			console.log(loginDetails);
			$cookieStore.put('email', loginDetails.email);
			// TODO need to change with email.
			var loginSuccessful = $http.get('http://patient-service.cfapps.io/patient/getPatientByEmail/'+loginDetails.email);
			console.log(">>>>>>>>>" + loginSuccessful.success);
			
			loginSuccessful.success(function(getPatientDetails) {
				if(getPatientDetails.patientId != null){
					$scope.message = 'Successfully Logged in...!!!';
					//$rootScope.getPatientByMobile = getPatientDetails; // TODO need to change by Email...
					$cookieStore.put('loginData', getPatientDetails);
					window.location = "#/patientdashboard";
				}else{
					$scope.message = 'Invalid Credentials...!!!';
		    		}
			});
			loginSuccessful.error(function(data, status, headers, config) {
				alert("failure message: " + data.message);
				$scope.message = 'Invalid Credentials...!!!';
			});
			
		}
	}else{
		$window.location.href = "#/patientdashboard";
	}
});

scotchApp.controller('patientlogout',function($scope, $rootScope, $http, $cookieStore, $window){
	
	$cookieStore.remove('email');
	$cookieStore.remove('loginData');
	window.location = "#/patientlogin";
});
scotchApp.controller('patientdashboard',function($scope, $rootScope, $http, $cookieStore){
	var patientDetail = $cookieStore.get('loginData');
	var fieldCounter = checkDoctorField(patientDetail);
	$scope.percent = parseInt((fieldCounter /7)*100)+'%';
	
});

function checkDoctorField(patients){
	
	if(patients != null){
		var field = 1;
		if(patients.homeAddress != null){
			field++;
		}
		return field;
	}
}
function getByEmail($http, $cookieStore){
	
	alert($cookieStore.get('email'));
	var patients = $http.get('http://patient-service.cfapps.io/patient/getPatientByEmail/'+$cookieStore.get('email'));
	patients.success(function(data) {
		return data;
	});
	// For error
	doctors.error(function(data, status, headers, config) {
		// alert("failure message: " + updateResponse.message);
	});
}
// Patient Login Success Starts---------------------------------------------------------------------------------------
scotchApp.controller('patientLoginSuccess', function($scope, $rootScope, $http){
	//http://patient-service.cfapps.io/patient/getpatientByName
	$scope.patientUpdate = false;
	$scope.patientDelete = false;
	$scope.newValue = function(value){
		console.log(value);
		if(value=='update'){
			$scope.patientDelete = false;
			$scope.patientUpdate = true;
			$scope.demo = function(patient){
				console.log(">>>>>>>>>>>> Demo" +patient.patientId);
				var patientGet = null;
				if(patient != null && patient.patientId!=null && patient.patientId != ""){
					patientGet = $http.get('http://patient-service.cfapps.io/patient/getpatientById/'+patient.patientId);
					patientUpdateAjax(patientGet, $scope, $http);
					$scope.modalBody = true;
				}else if(patient!=null && patient.patientMobile != null && patient.patientMobile !=""){
					// Ajax on basis of patientMobileNumber.
					patientGet = $http.get('http://patient-service.cfapps.io/patient/getPatientByMobile/'+patient.patientMobile);
					// Function called
					patientUpdateAjax(patientGet, $scope, $http);
					$scope.modalBody = true;
					
				}else if(patient != null && patient.patientAadhaar != null && patient.patientAadhaar != ""){
					// Ajax on basis of patientAdhaarNumber.
					patientGet = $http.post('http://patient-service.cfapps.io/patient/getPatientByAadhar/'+patient.patientAadhaar);
					// Function called
					patientUpdateAjax(patientGet, $scope, $http);
					$scope.modalBody = true;
				}else if(patient!=null && patient.patientEmail != null && patient.patientEmail !=""){
					// Ajax on basis of patientMobileNumber.
					patientGet = $http.get('http://patient-service.cfapps.io/patient/getPatientByEmail/'+patient.patientEmail);
					// Function called
					patientUpdateAjax(patientGet, $scope, $http);
					$scope.modalBody = true;
					
				}else{
					$scope.modalBody = false;
					$scope.modalBodyMsg = " Please provide input";
				}
				}
			}else if(value=='delete'){
			$scope.patientDelete = true;
			$scope.patientUpdate = false;
			}else{
				$scope.patientDelete = false;
				$scope.patientUpdate = false;
			}
		}
});
//patientUpdateAjax Starts
function patientUpdateAjax(patientGet, $scope, $http){
	
	// Get before update...
	patientGet.success(function(data) {
		$scope.patients = data;
		console.log($scope.patients);
		
		// if no value found then it will display this
		if(data.patientId == null){
			$scope.modalBody = false;
			$scope.modalBodyMsg = " Please provide correct value.";
		}
		// Update function calls
		$scope.patientUpdate = function(patientUpdateValue){
			console.log(patientUpdateValue);
			// Update Ajax hit
			var updatepatient = $http.put('https://patient-service.cfapps.io/patient/', patientUpdateValue);
			// For success
			updatepatient.success(function(updateResponse) {
				$scope.patientUpdate = updateResponse.message;
			});
			// For error
			patientGet.error(function(updateResponse, status, headers, config) {
				alert("failure message: " + updateResponse.message);
			});
		}
	});
	patientGet.error(function(data, status, headers, config) {
		alert("failure message: " + data.message);
		$scope.modalBody = false;
		$scope.modalBodyMsg = " Please provide correct value.";
	});
	return;
}
// patientUpdateAjax Ends


//------------------------------------------------------------patientDeleteAjax Starts
function patientDeleteAjax(patientGet, $scope, $http){
	
	// Get before update...
	patientGet.success(function(data) {
		$scope.patients = data;
		console.log($scope.patients);
		
		// if no value found then it will display this
		if(data.patientId == null){
			$scope.modalBody = false;
			$scope.modalBodyMsg = " Please provide correct value.";
		}
		// Update function calls
		$scope.patientDelete = function(patientUpdateValue){
			console.log(patientDeleteValue);
			// Update Ajax hit
			var deletepatient = $http.put('http://patient-service.cfapps.io/patient', patientUpdateValue);
			// For success
			deletepatient.success(function(updateResponse) {
				$scope.patientDelete = updateResponse.message;
			});
			// For error
			patientGet.error(function(deleteResponse, status, headers, config) {
				alert("failure message: " + deleteResponse.message);
			});
		}
	});
	patientGet.error(function(data, status, headers, config) {
		alert("failure message: " + data.message);
		$scope.modalBody = false;
		$scope.modalBodyMsg = " Please provide correct value.";
	});
	return;
}
//------------------------------------------------------------patientDeleteAjax Ends
//Patient Login Success Ends---------------------------------------------------------------------------------------
//patient sign up Starts------------------------------------------------------------------------------------------------
scotchApp.controller('patientsignup',function($scope, $http){
	$scope.patientAdd = function(patient, formName) {
		console.log(patient);
		$scope.submit = true;
		console.log(formName);
		if ($scope[formName].$valid) {
		   var res = $http.post('http://patient-service.cfapps.io/patient/',patient);
		   res.success(function(data) {
			   alert(data.message);
			   $scope.isVisible = false;
	});
	res.error(function(data, status, headers, config) {
		alert("failure message: " + data.message);
	});
}else{
	console.log("invalid")
	}
}
	$scope.doBlurName = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientName.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
}
	$scope.doBlurMobile = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientMobile != null && $scope.patient.patientMobile.length == 10){
			target.blur();	
		}else{
			target.focus();
		}
	}
	$scope.doBlurAdhar = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientAadhaar != null && $scope.patient.patientAadhaar.length == 12){
			target.blur();	
		}else{
			target.focus();
		}
	}
/*	$scope.doBlurHomeAddress = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientHomeAddress != null && $scope.patient.patientHomeAddress.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
}*/
});
//patient sign up Ends------------------------------------------------------------------------------------------------
scotchApp.controller('patientupdateProfile',function($scope, $rootScope, $http, $cookieStore){
	
	$scope.patients = $cookieStore.get('loginData');
	
	$scope.patientUpdate = function(patientUpdateValue){
		console.log(patientUpdateValue);
		// Update Ajax hit
		var updatepatient = $http.put('http://patient-service.cfapps.io/patient/', patientUpdateValue);
		// For success
		updatepatient.success(function(updateResponse) {
			$scope.successMessage = "Successfully Updated...!!!";

			// Rest hit to get data and refresh cookies......Strats
			var patientSuccess = $http.get('http://patient-service.cfapps.io/patient/getPatientByEmail/'+patients.patientEmail);
			patientSuccess.success(function(data) {
				alert("dfdfdf");
				console.log(data.mobile);
				$cookieStore.remove('loginData');
				$cookieStore.put('loginData', data);
			});
			// For error
			patientSuccess.error(function(data, status, headers, config) {
				// alert("failure message: " + updateResponse.message);
			});
			// Rest hit to get data and refresh cookies......Ends
		});
		// For error
		updatepatient.error(function(updateResponse, status, headers, config) {
			alert("failure message: " + updateResponse.message);
		});
	}
	
	// validation Added......................
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

	
	// check validation
});
scotchApp.controller('retrievePassword',function($scope, $rootScope){
	$scope.submit = function(){
        /* $scope.message = "Password send to your E-mail Id"; */
        alert("Password send to your E-mail Id");
	}
});

scotchApp.controller('patientafterLogin',function($scope, $rootScope, $cookieStore){
	
	
	if($cookieStore.get('loginData') != undefined && $cookieStore.get('email') != undefined){

		console.log("<<<<<<<<<<<<" +$cookieStore.get('loginData'));
		var getLoginDetails = $cookieStore.get('loginData');
		if(getLoginDetails.gender == '0'){
			getLoginDetails.gender = 'Female';
		}else{
			getLoginDetails.gender = 'Male';
		}
		
		$scope.patient = getLoginDetails;
		
	}else{
		window.location = "#/patientlogin";
	}
});