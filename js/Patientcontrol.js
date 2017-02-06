scotchApp.controller('patientlogin',function($scope){
	alert("patient login");
	
	$scope.patientLogin = function(loginDetails){
		console.log(loginDetails);
		if(loginDetails.password == 'user'){
			$scope.message = 'Successfully logged in....!!!!!!';
			$scope.login = loginDetails;
			window.location="#/patientLoginSuccess";
		}else{
			$scope.message = 'Invalid Credentials...!!!';
		}
	}
});

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
	$scope.doBlurHomeAddress = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientHomeAddress != null && $scope.patient.patientHomeAddress.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
}
});
//patient sign up Ends------------------------------------------------------------------------------------------------