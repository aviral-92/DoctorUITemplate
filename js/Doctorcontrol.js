scotchApp.controller('middleContent', function($scope, $cookieStore) {
	if ($cookieStore.get('loginData') != undefined
			&& $cookieStore.get('email') != undefined) {
		window.location = "#/dashboard";
	} else if ($cookieStore.get('patientData') != undefined
			&& $cookieStore.get('patientEmail') != undefined) {
		window.location = "#/patientdashboard";
	}
});

scotchApp.controller('doctorSearch', function($scope, $http) {
	$scope.loader = false;
	$scope.searchDoctor = function(loginDetail) {
		var doctorSearch = null;
		if (loginDetail != null) {
			$scope.message = null;
			$scope.doctors = null;
			$scope.modalBody = false;

			console.log(loginDetail);
			doctorSearch = $http.post(
					'https://doctor-service.cfapps.io/doctor/get/all',
					loginDetail);
			$scope.loader = true;
		} else {
			$scope.message = "please provide input";
		}
		if (doctorSearch != null) {
			doctorSearch.success(function(getDoctor) {
				console.log(">>>>>>>" + getDoctor[0].mobile);
				$scope.doctors = getDoctor;
				$scope.modalBody = true;
				$scope.loader = false;
			});
			doctorSearch.error(function(data, status, headers, config) {
				alert("failure message: " + data.message);
				$scope.message = 'No Data Found!!!';
			});
		}
	}
	$scope.close = function() {
		console.log('........');
		$scope.doctors = null;
		$scope.message = null;
		$scope.modalBody = false;
	}
});

scotchApp.controller('login', function($scope, $rootScope, $http, $cookieStore,
		$window) {
	if ($cookieStore.get('loginData') == undefined
			|| $cookieStore.get('email') == undefined) {
		$scope.doctorLogin = function(loginDetail) {
			console.log(loginDetail);
			$cookieStore.put('email', loginDetail.email);
			var loginSuccessful = $http
					.get('https://doctor-service.cfapps.io/doctor/get/'
							+ loginDetail.email + '/email');
			console.log(">>>>>>>>>" + loginSuccessful.success);
			loginSuccessful.success(function(getDoctorDetails) {
				if (getDoctorDetails.doctorId != null) {
					$scope.message = 'Successfully Logged in...!!!';
					$rootScope.getDoctorByMobile = getDoctorDetails;
					$cookieStore.put('loginData', getDoctorDetails);
					window.location = "#/dashboard";
				} else {
					$scope.message = 'Invalid Credentials...!!!';
				}
			});
			loginSuccessful.error(function(data, status, headers, config) {
				alert("failure message: " + data.message);
				$scope.message = 'Invalid Credentials...!!!';
			});
		}
	} else {
		$window.location.href = "#/dashboard";
	}
});

scotchApp.controller('logout', function($scope, $rootScope, $http,
		$cookieStore, $window) {

	$cookieStore.remove('email');
	$cookieStore.remove('loginData');
	window.location = "#/login";
});

scotchApp.controller('about', function($scope) {
});

scotchApp.controller('contact', function($scope) {
});

scotchApp.controller('signUp', function($scope, $http) {
	$scope.doctorAdd = function(doctor, formName) {
		console.log(doctor);
		$scope.submit = true;
		console.log(formName);
		if ($scope[formName].$valid) {
			var res = $http.post('https://doctor-service.cfapps.io/doctor/',
					doctor);
			res.success(function(data) {
				alert(data.message);
				$scope.isVisible = false;
			});
			res.error(function(data, status, headers, config) {
				alert("failure message: " + data.message);
			});
		} else {
			console.log("invalid")
		}
	}
	$scope.doBlurName = function($event) {
		var target = $event.target;
		if ($scope.doctor != null && $scope.doctor.name.length > 0) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurMobile = function($event) {
		var target = $event.target;
		if ($scope.doctor != null && $scope.doctor.mobile != null
				&& $scope.doctor.mobile.length == 10) {
			target.blur();
		} else {
			target.focus();
		}
	}
	$scope.doBlurAdhar = function($event) {
		var target = $event.target;
		if ($scope.doctor != null && $scope.doctor.aadhaarNumber != null
				&& $scope.doctor.aadhaarNumber.length == 12) {
			target.blur();
		} else {
			target.focus();
		}
	}
});
/** **********************Dashboard Starts*********************** */

scotchApp.controller('dashboard', function($scope, $rootScope, $http,
		$cookieStore) {
	var doctorDetail = $cookieStore.get('loginData');
	if (doctorDetail != null) {
		var field = 6;
		if (doctorDetail.homeAddress != null) {
			field++;
		}
		if (doctorDetail.highestDegree != null) {
			field++;
		}
		if (doctorDetail.expertized != null) {
			field++;
		}
		if (doctorDetail.isGovernmentServent != null) {
			field++;
		}
		if (doctorDetail.clinicAddress != null) {
			field++;
		}
		if (doctorDetail.oneTimeFee != null && doctorDetail.oneTimeFee != '') {
			field++;
		}
		if (doctorDetail.daysCheckFree != null) {
			field++;
		}
		$scope.percent = parseInt((field / 13) * 100) + '%';
	}
});

function getByEmail($http, $cookieStore) {
	alert($cookieStore.get('email'));
	var doctors = $http.get('https://doctor-service.cfapps.io/doctor/get/'
			+ $cookieStore.get('email') + '/email');
	doctors.success(function(data) {
		return data;
	});
	doctors.error(function(data, status, headers, config) {
	});
}

scotchApp.controller('updateProfile', function($scope, $rootScope, $http,
		$cookieStore) {

	var getDoctors = $cookieStore.get('loginData');
	$scope.doctors = getDoctors
	$scope.doctorUpdate = function(doctorUpdateValue) {
		console.log(doctorUpdateValue);

		if (getDoctors.mobile == doctorUpdateValue.mobile) {
			alert("Hello");
			delete doctorUpdateValue.mobile;
		}
		if (getDoctors.email == doctorUpdateValue.email) {
			alert("Hello");
			delete doctorUpdateValue.email;
		}
		if (getDoctors.aadhaarNumber == doctorUpdateValue.aadhaarNumber) {
			alert("Hello");
			delete doctorUpdateValue.aadhaarNumber;
		}
		// console.log(doctorUpdateValue);
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

scotchApp.controller('retrievePassword', function($scope, $rootScope) {
	$scope.submit = function() {
		alert("Password send to your E-mail Id");
	}
});

scotchApp.controller('afterLogin', function($scope, $rootScope, $cookieStore) {
	if ($cookieStore.get('loginData') != undefined
			&& $cookieStore.get('email') != undefined) {
		console.log("<<<<<<<<<<<<" + $cookieStore.get('loginData'));
		var getLoginDetails = $cookieStore.get('loginData');
		if (getLoginDetails.gender == '0') {
			getLoginDetails.gender = 'Female';
		} else {
			getLoginDetails.gender = 'Male';
		}
		if (getLoginDetails.isGovernmentServent == '0') {
			getLoginDetails.isGovernmentServent = 'Yes';
		} else {
			getLoginDetails.isGovernmentServent = 'No';
		}
		$scope.doctor = getLoginDetails;

	} else {
		window.location = "#/login";
	}
});
/** **********************Dashboard Ends*********************** */
