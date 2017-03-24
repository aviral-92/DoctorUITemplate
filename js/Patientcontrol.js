



scotchApp.controller('patientdashboard', function($scope, $rootScope, $http, $cookieStore) {
    var patientDetail = $cookieStore.get('patientData');

    if (patientDetail != null) {
        var field = 6;
        if (patientDetail.homeAddress != null) {
            field++;
        }
        $scope.percent = parseInt((field / 7) * 100) + '%';
    }
});

function getByEmail($http, $cookieStore) {

    alert($cookieStore.get('patientEmail'));
    var patients = $http.get('http://patient-service.cfapps.io/api/patient/getPatientByEmail/' + $cookieStore.get('patientEmail'));
    patients.success(function(data) {
        return data;
    });
    doctors.error(function(data, status, headers, config) {});
}


/*scotchApp.controller('patientsignup',function($scope, $http){
	$scope.patientAdd = function(patient, formName) {
		console.log(patient);
		$scope.submit = true;
		console.log(formName);
		if ($scope[formName].$valid) {
		   var res = $http.post('http://patient-service.cfapps.io/api/patient/',patient);
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
});*/

/*scotchApp.controller('retrievePassword',function($scope, $rootScope){
	$scope.submit = function(){
        alert("Password send to your E-mail Id");
	}
});*/

/*scotchApp.controller('patientafterLogin',function($scope, $rootScope, $cookieStore){

	if($cookieStore.get('patientData') != undefined && $cookieStore.get('patientEmail') != undefined){
		console.log("<<<<<<<<<<<<" +$cookieStore.get('patientData'));
		var getLoginDetails = $cookieStore.get('patientData');
		if(getLoginDetails.gender == '0'){
			getLoginDetails.gender = 'Female';
		}else{
			getLoginDetails.gender = 'Male';
		}
		$scope.patient = getLoginDetails;
	}else{
		window.location = "#/patientlogin";
	}
});*/