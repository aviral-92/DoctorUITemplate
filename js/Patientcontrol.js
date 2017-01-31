scotchApp.controller('patientlogin',function($scope){
	
});

//patient sign up Starts------------------------------------------------------------------------------------------------
scotchApp.controller('patientsignup',function($scope, $http){
	$scope.patientAdd = function(patient, formName) {
		console.log(patient);
		$scope.submit = true;
		console.log(formName);
		if ($scope[formName].$valid) {
		   var res = $http.post('https://doctor-service.cfapps.io/customermanagement/addpatient',patient);
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
		if($scope.doctor != null && $scope.patient.patientName.length > 0){
			target.blur();	
		}else{
			target.focus();
		}
}
	$scope.doBlurMobile = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientNumber != null && $scope.patient.patientNumber.length == 10){
			target.blur();	
		}else{
			target.focus();
		}
	}
	$scope.doBlurAdhar = function($event){
		var target = $event.target;
		if($scope.patient != null && $scope.patient.patientAdhaarNumber != null && $scope.patient.patientAdhaarNumber.length == 12){
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