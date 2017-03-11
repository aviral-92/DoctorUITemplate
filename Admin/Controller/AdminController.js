scotchApp.controller('adminIndex', function($scope) {

});

scotchApp.controller('adminHome', function($scope, $cookieStore) {

});

scotchApp.controller('adminIndexPage', function($scope, $http) {
	
	var response = $http.get('https://dynamicuiservice.cfapps.io/firstpage/getall');
	response.success(function(getDataOnAjax) {
		$scope.getDatas = getDataOnAjax;
	});
	response.error(function(data, status, headers, config) {
		alert("Error");
	});
	
	/*$scope.adminIndex = function(updateData) {
		var details = null;
		if (updateData != null) {
			$scope.message = null;
			console.log(updateData);
//			details = 
		} else {
			$scope.message = "please provide input..!!!";
		}

		if (details != null) {
			details.success(function(getData) {
				console.log(">>>>>>>" + getData[0].mobile);
				$scope.doctors = getData;
				$scope.modalBody = true;
				$scope.loader = false;
			});
			details.error(function(data, status, headers, config) {
				alert("failure message: " + data.message);
				$scope.message = 'No Data Found!!!';
			});
		}
	}*/
});

scotchApp.controller('adminAboutUsPage', function($scope) {

});

scotchApp.controller('adminContactUsPage', function($scope) {

});

scotchApp.controller('adminDoctorPage', function($scope) {

});

scotchApp.controller('adminPatientPage', function($scope) {

});
scotchApp.controller('signout', function($scope, $cookieStore, $window) {

	/*
	 * $cookieStore.remove('email') ; $cookieStore.remove('loginData') ;
	 */
	$window.location.href = '/index.html#/';
});