scotchApp.controller('middleContent',function($scope){
	
});

scotchApp.controller('login',function($scope){
	
});

scotchApp.controller('about',function($scope){
	
});

scotchApp.controller('contact',function($scope){
	
});

scotchApp.controller('signUp',function($scope, $http){
	console.log("Hello");
	
	$scope.doctorAdd = function(doctor, formName) {
		
		console.log(doctor);
		$scope.submit = true;
		/* console.log($scope.submit); */
		console.log(formName);
		   if ($scope[formName].$valid) {
			   alert("test");
			   var res = $http
				.post(
						'https://doctor-service.cfapps.io/doctor-management/adddoctor',
						doctor);
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
});

scotchApp
.controller(
		'addDoctorController',
		function($scope, $http) {

			$scope.isVisible = false;
			$scope.notVisible = false;
			$scope.ShowHide = function() {
				$scope.isVisible = $scope.isVisible ? false : true;
			}
			
			$scope.textValidation = function(){
				
				if($scope.doctorName == null || $scope.doctorName == ""){
					$scope.notVisible = true;
					console.log("-------"+$scope.doctorName);
					$scope.notValid = "Please enter Doctor Name.";
				}
			}
			$scope.doctorAdd = function(doctor, formName) {
				
				$scope.submit = true;
				console.log($scope.submit);
				console.log(formName);
				   if ($scope[formName].$valid) {
					   alert("test");
					   var res = $http
						.post(
								'http://localhost:9090/doctor-management/adddoctor',
								doctor);
				res.success(function(data) {
					alert(data.message);
					$scope.isVisible = false;

				});
				res.error(function(data, status, headers, config) {
					alert("failure message: " + data.message);
				});
			}
				   console.log(doctor);
			}
		});
			
// ---------------------Add Doctor Angular JS code Ends--------------------

/** **********************get Customer Start*********************** */

/* var getCustomerJs = angular.module('getPatientApp', []); */
scotchApp.controller('aboutController',
		function($scope, $http) {

			$scope.visible = false;
			$scope.customerGet = function(customer) {

				var custId = $scope.custId;
				var doctorMobileNumber = $scope.doctorMobileNumber;
				var doctorAdharNumber = $scope.doctorAdharNumber;

				if (custId != null && parseInt(custId) > 0) {
					console.log(custId);
					response('/getCustomerById/' + parseInt(custId));
				} else if (custName != null && custName != ""
						&& custName != " ") {
					console.log(custName);
					response('/getCustomerByName/' + custName);
				} else if (custMobile != null
						&& custMobile != ""
							&& custMobile != " ") {
						console.log(custMobile);
						response('/getCustomerByMobile/' + custMobile);
					}else if (custAadhaar != null && custAadhaar != ""
						&& custAadhaar != " ") {
					console.log(custAadhaar);
					response('/getCustomerByAadhar/' + custAadhaar);
				}else if (CustEmail != null
						&& CustEmail != ""
							&& CustEmail != " ") {
						console.log(CustEmail);
						response('/getCustomerByEmail/' + CustEmail);
					} else {
					alert("Please provide any input");
				}
				$scope.visible = true;
			}

			function response(pathVariable) {

				var url = 'http://localhost:9090/customermanagement';
				var res = $http.post(url + pathVariable);
				res.success(function(data) {
					alert(data[0].custName);
					console.log(data);
					$scope.customers = data;
				});
				res.error(function(data, status, headers, config) {
					alert("failure message: " + JSON.stringify({
						data : data
					}));
				});
			}
		});

/** **********************get Customer Ends*********************** */
/** **********************delete Customer Start*********************** */
/* var deleteCustomerJs = angular.module('deletePatientApp', []); */
scotchApp.controller('contactController', function($scope, $http) {
	$scope.customerDelete = function(customer) {
		var res = null;
		if (customer != null) {
			if(customer.custId!=null && customer.custId != ""){
			   alert("test");
			   res = $http.delete(
				'http://localhost:9090/customermanagement/deletecustomerById/'+customer.custId);
		}else if(customer.custMobile != null && customer.custMobile != ""){
				res = $http.delete(
					'http://localhost:9090/customermanagement/deleteCustomerByMobile/'+doctor.custMobile);
		}else if(customer.custAadhaar != null && customer.custAadhaar != ""){
				res = $http.delete(
					'http://localhost:9090/customermanagement/deleteCustomerByAadhar/'+customer.custAadhaar);
		}
				if(res != null){
				res.success(function(data, status, headers, config) {
				alert(data.message);
				console.log(data);
				console.log(headers);
				$scope.isVisible = false;

			});
				res.error(function(data, status, headers, config) {
					alert("failure message: " + JSON.stringify({
						data : data
					}));
				});
				}else{
					alert("dfdfg");
				}
			}else{
				alert("Please provide input");
			}
			console.log(customer);
	}
});

/** **********************delete Customer Ends*********************** */
/** **********************Update Customer Starts*********************** */

// var updateCustomerJs = angular.module('UpdateCustomerApp', []);
scotchApp.controller('updateCustomerController', function($scope, $http) {
	$scope.visible = false;
	$scope.isVisible = false;
	$scope.ShowHide = function() {
		$scope.isVisible = $scope.isVisible ? false : true;
	}

	$scope.customerSearch = function() {
		var custId = $scope.custId;
		var custMobile = $scope.custMobile;
		var custAadhaar = $scope.custAadhaar;
		if (custId != null && parseInt(custId) > 0) {
			console.log(custId);
			response('/getCustomerById/' + parseInt(custId));
		} else if (custMobile != null && custMobile != ""
				&& custMobile != " ") {
			console.log(custMobile);
			response('/getCustomerByMobile/' + custMobile);
		} else if (custAadhaar != null && custAadhaar != ""
				&& custAadhaar != " ") {
			console.log(custAadhaar);
			response('/getCustomerByAadhar/' + custAadhaar);
		} else {
			alert("Please provide any input");
		}
		
		$scope.visible = true;
	}

	$scope.customerUpdate = function(customer) {

		var updatedCustomerArray = {

				custId : customer.custId,
				custName : customer.custName,
				custMobile : customer.custMobile,
				custEmail: customer.custEmail,
				custHomeAddress : customer.custHomeAddress,
				custAadhaar : customer.custAadhaar,
				/*
				 * doctorHighestDegree : customer.doctorHighestDegree,
				 * doctorExpertized : customer.doctorExpertized,
				 * doctorGovtServent : Boolean(customer.doctorGovt),
				 * doctorOneTimeConsultingFee :
				 * customer.doctorOneTimeConsultingFee,
				 * doctorDaystoCheckFreeInConsultingFee :
				 * parseInt(customer.doctorDaystoCheckFreeInConsultingFee),
				 * doctorShopAddress : customer.doctorShopAddress
				 */
		}
		console.log(updateCustomerArray);
		updateCustomer(updateCustomerArray);
	};

	function response(pathVariable) {

		var url = 'http://localhost:9090/customermanagement';
		var res = $http.get(url + pathVariable);
		res.success(function(data) {
			alert(data[0].custName);
			
			console.log(data);
			$scope.customers = data;
		});
		res.error(function(data, status, headers, config) {
			alert("failure message: " + JSON.stringify({
				data : data
			}));
		});
	}
	
	function updateCustomer(jsonData) {

		var url = 'http://localhost:9090/customermanagement/updatecustomer';
		var res = $http.post(url,jsonData);
		res.success(function(data) {
			alert(data.message);
			console.log(data);
		});
		res.error(function(data, status, headers, config) {
			alert("failure message: " + JSON.stringify({
				data : data
			}));
		});
	}
});

/** **********************Update Customer Ends*********************** */