scotchApp.controller('middleContent',function($scope){
	
});

scotchApp.controller('login',function($scope, $rootScope){
	alert("ddd");
	$scope.doctorLogin = function(loginDetail){
		console.log(loginDetail);
		if(loginDetail.password == 'admin'){
			$scope.message = 'Successfully Logged in...!!!';
			$rootScope.login = loginDetail;
			window.location = "#/drLoginSuccess";
		}else{
			$scope.message = 'Invalid Credentials...!!!';
		}
	}
});

scotchApp.controller('drLoginSuccess', function($scope, $rootScope, $http){
	
// $scope.message = 'Hi '+$rootScope.login.email+ ', Login successful...';
	$scope.drUpdate = false;
	$scope.newValue = function(value){
		console.log(value);
		if(value == 'update'){
			$scope.drUpdate = true;
			$scope.demo = function(doctor){
				console.log(">>>>>>>>>>>> Demo" +doctor.doctorId);
				var doctorGet = null;
				if(doctor != null && doctor.doctorId != null && doctor.doctorId != ""){
					// Ajax on basis of doctorId.
					doctorGet = $http.get('https://doctor-service.cfapps.io/doctor-management/getdoctorbyid/'+doctor.doctorId);
					// Function called
					doctorUpdateAjax(doctorGet, $scope, $http);
					$scope.modalBody = true;
				}
				else if(doctor != null && doctor.doctorMobileNumber != null && doctor.doctorMobileNumber != ""){
					// Ajax on basis of doctorMobileNumber.
					doctorGet = $http.get('https://doctor-service.cfapps.io/doctor-management/getdoctorbymobilenumber/'+doctor.doctorMobileNumber);
					// Function called
					doctorUpdateAjax(doctorGet, $scope, $http);
					$scope.modalBody = true;
				}else if(doctor != null && doctor.doctorAdharNumber != null && doctor.doctorAdharNumber != ""){
					// Ajax on basis of doctorAdhaarNumber.
					doctorGet = $http.get('https://doctor-service.cfapps.io/doctor-management/getdoctorbyadharNumber/'+doctor.doctorAdharNumber);
					// Function called
					doctorUpdateAjax(doctorGet, $scope, $http);
					$scope.modalBody = true;
				}else{
					$scope.modalBody = false;
					$scope.modalBodyMsg = " Please provide input";
				}
			}
		}else{
			$scope.drUpdate = false;
		}
	}
});

function doctorUpdateAjax(doctorGet, $scope, $http){
	
	// Get before update...
	doctorGet.success(function(data) {
		$scope.doctors = data;
		console.log($scope.doctors);
		
		// if no value found then it will display this
		if(data.doctorId == null){
			$scope.modalBody = false;
			$scope.modalBodyMsg = " Please provide correct value.";
		}
		// Update function calls
		$scope.doctorUpdate = function(doctorUpdateValue){
			console.log(doctorUpdateValue);
			// Update Ajax hit
			var updateDoctor = $http.put('https://doctor-service.cfapps.io/doctor-management/updatedoctor', doctorUpdateValue);
			// For success
			updateDoctor.success(function(updateResponse) {
				$scope.doctorUpdate = updateResponse.message;
			});
			// For error
			doctorGet.error(function(updateResponse, status, headers, config) {
				alert("failure message: " + updateResponse.message);
			});
		}
	});
	doctorGet.error(function(data, status, headers, config) {
		alert("failure message: " + data.message);
		$scope.modalBody = false;
		$scope.modalBodyMsg = " Please provide correct value.";
	});
	return;
}

scotchApp.controller('about',function($scope){
	
});

scotchApp.controller('contact',function($scope){
	
});

scotchApp.controller('signUp',function($scope, $http){
		$scope.doctorAdd = function(doctor, formName) {
			console.log(doctor);
			$scope.submit = true;
			console.log(formName);
			if ($scope[formName].$valid) {
			   var res = $http.post('https://doctor-service.cfapps.io/doctor-management/adddoctor',doctor);
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
			if($scope.doctor != null && $scope.doctor.doctorName.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurMobile = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorNumber != null && $scope.doctor.doctorNumber.length == 10){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurAdhar = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorAdhaarNumber != null && $scope.doctor.doctorAdhaarNumber.length == 12){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurHomeAddress = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorHomeAddress != null && $scope.doctor.doctorHomeAddress.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurDegree = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorHighestDegree != null && $scope.doctor.doctorHighestDegree.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurExpertise = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorExpertized != null && $scope.doctor.doctorExpertized.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurShopAddress = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorShopAddress != null && $scope.doctor.doctorShopAddress.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurFees = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorOneTimeConsultingFee != null && $scope.doctor.doctorOneTimeConsultingFee.length > 0){
				target.blur();	
			}else{
				target.focus();
			}
		}
		$scope.doBlurConsulting = function($event){
			var target = $event.target;
			if($scope.doctor != null && $scope.doctor.doctorDaystoCheckFreeInConsultingFee != null && $scope.doctor.doctorDaystoCheckFreeInConsultingFee.length > 0){
				target.blur();	
			}else{
				target.focus();
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