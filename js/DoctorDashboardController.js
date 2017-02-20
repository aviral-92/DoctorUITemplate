scotchApp.controller('doctorDashboard',
		function($scope, $rootScope, $http, $cookieStore) {
			var doctorDetail = $cookieStore.get('loginData');
			if (doctorDetail != null) {
				var field = 6;
				if (doctorDetail.homeAddress != null
						&& doctorDetail.homeAddress != 'NA') {
					field++;
				}
				if (doctorDetail.highestDegree != null
						&& doctorDetail.highestDegree != 'NA') {
					field++;
				}
				if (doctorDetail.expertized != null
						&& doctorDetail.expertized != 'NA') {
					field++;
				}
				if (doctorDetail.isGovernmentServent != null
						&& doctorDetail.isGovernmentServent != 'NA') {
					field++;
				}
				if (doctorDetail.clinicAddress != null
						&& doctorDetail.clinicAddress != 'NA') {
					field++;
				}
				if (doctorDetail.oneTimeFee != null
						&& doctorDetail.oneTimeFee != ''
						&& doctorDetail.oneTimeFee != 'NA') {
					field++;
				}
				if (doctorDetail.daysCheckFree != null
						&& doctorDetail.daysCheckFree != 'NA') {
					field++;
				}
				$scope.percent = parseInt((field / 13) * 100) + '%';
			}
		});

scotchApp.controller('afterLogin', function($scope, $rootScope, $cookieStore) {
	if ($cookieStore.get('loginData') != undefined
			&& $cookieStore.get('email') != undefined) {
		console.log("<<<<<<<<<<<<" + $cookieStore.get('loginData'));
		var getLoginDetails = $cookieStore.get('loginData');
		if (getLoginDetails.gender == '0') {
			getLoginDetails.gender = 'Female';
		} else if (getLoginDetails.gender == '1') {
			getLoginDetails.gender = 'Male';
		} else {
			getLoginDetails.gender = 'Transgen';
		}
		if (getLoginDetails.isGovernmentServent == '0') {
			getLoginDetails.isGovernmentServent = 'Yes';
		} else {
			getLoginDetails.isGovernmentServent = 'No';
		}
		$scope.doctor = getLoginDetails;

	} else {
		window.location = "#/loginPage";
	}
});

scotchApp.controller('logout', function($scope, $rootScope, $http,
		$cookieStore, $window) {

	$cookieStore.remove('email');
	$cookieStore.remove('loginData');
	window.location.href = "/index.html"; //edit route for new login page
});

scotchApp.controller('dashboard',
	function($scope, $rootScope, $http, $cookieStore) {
		var doctorDetail = $cookieStore.get('loginData');
		if (doctorDetail != null) {
			var field = 6;
			if (doctorDetail.homeAddress != null
					&& doctorDetail.homeAddress != 'NA') {
				field++;
			}
			if (doctorDetail.highestDegree != null
					&& doctorDetail.highestDegree != 'NA') {
				field++;
			}
			if (doctorDetail.expertized != null
					&& doctorDetail.expertized != 'NA') {
				field++;
			}
			if (doctorDetail.isGovernmentServent != null
					&& doctorDetail.isGovernmentServent != 'NA') {
				field++;
			}
			if (doctorDetail.clinicAddress != null
					&& doctorDetail.clinicAddress != 'NA') {
				field++;
			}
			if (doctorDetail.oneTimeFee != null
					&& doctorDetail.oneTimeFee != ''
					&& doctorDetail.oneTimeFee != 'NA') {
				field++;
			}
			if (doctorDetail.daysCheckFree != null
					&& doctorDetail.daysCheckFree != 'NA') {
				field++;
			}
		$scope.percent = parseInt((field / 13) * 100) + '%';
	}
});

scotchApp.controller('updateProfile', function($scope, $rootScope, $http,
		$cookieStore) {

	var getDoctors = $cookieStore.get('loginData');
	$scope.doctors = getDoctors
	$scope.doctorUpdate = function(doctorUpdateValue) {
		console.log(doctorUpdateValue);

		if (getDoctors.mobile == doctorUpdateValue.mobile) {
			delete doctorUpdateValue.mobile;
		}
		if (getDoctors.email == doctorUpdateValue.email) {
			delete doctorUpdateValue.email;
		}
		if (getDoctors.aadhaarNumber == doctorUpdateValue.aadhaarNumber) {
			delete doctorUpdateValue.aadhaarNumber;
		}
		var updateDoctor = $http.put(
				'https://doctor-service.cfapps.io/doctor/', doctorUpdateValue);
		updateDoctor.success(function(updateResponse) {
			$scope.successMessage = "Successfully Updated...!!!";
			var doctorSuccess = $http
					.get('https://doctor-service.cfapps.io/doctor/get/'
							+ $cookieStore.get('email') + '/email');
			doctorSuccess.success(function(data) {
				$cookieStore.remove('loginData');
				$cookieStore.put('loginData', data);
			});
			doctorSuccess.error(function(data, status, headers, config) {
			});
		});
		updateDoctor.error(function(updateResponse, status, headers, config) {
			alert("failure message: " + updateResponse.message);
		});
	}
	$scope.doBlurName = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.name.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurMobile = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.mobile != null
				&& $scope.doctors.mobile.length == 10) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurDegree = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.highestDegree != null
				&& $scope.doctors.highestDegree.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurHomeAddress = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.homeAddress != null
				&& $scope.doctors.homeAddress.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurExpertise = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.expertized != null
				&& $scope.doctors.expertized.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurShopAddress = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.clinicAddress != null
				&& $scope.doctors.clinicAddress.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurFees = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.oneTimeFee != null
				&& $scope.doctors.oneTimeFee.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurConsulting = function($event) {
		var target = $event.target;
		if ($scope.doctors != null && $scope.doctors.daysCheckFree != null
				&& $scope.doctors.daysCheckFree.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
});
