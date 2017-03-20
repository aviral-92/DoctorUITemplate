scotchApp.controller('patientLogin', function($scope, $rootScope, $http, $cookieStore,
    $window, $cookies) {
    var vm = this;
	vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";
    
    if ($cookieStore.get('loginData') == undefined ||
    		  $cookies.email == undefined) {


        $scope.patientLogin = function(loginDetail) {
            /* console.log(loginDetail);
             $cookieStore.put('email', loginDetail.email);*/
            
            if(vcRecaptchaService.getResponse() === ""){ //if string is empty
				alert("Please resolve the captcha and submit!")
			}else{
                var post_data = {  //prepare payload for request
					'g-recaptcha-response':vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
				}
            console.log(post_data);
            /* Make Ajax request to our server with g-captcha-string */
                //Need to give our API to validate
				$http.post('http://code.ciphertrick.com/demo/phpapi/api/signup',post_data).success(function(response){
					if(response.error === 0){
						alert("Successfully verified and signed up the user");
					}else{
						//alert("User verification failed");
					}
				})
				.error(function(error){
				alert("Captcha invalid")
				})
             }
            
            loginDetail.type = 'p';
            var loginSuccessful = $http
                .post("https://doctors.cfapps.io/api/patientLogin/signUp", loginDetail);
            loginSuccessful.success(function(login) {

            	if(login.message=="success"){
            		if(loginDetail.username.include=="@"){
            			 var patientSuccess = $http.get("https://doctors.cfapps.io/api/patient/get/"+ loginDetail.username +"/email");
            			 patientSuccess.success(function (patientObj){
            				 patientObj.src = '/images/no_pic.png';
                              $cookieStore.put('loginData', patientObj);
                              $window.location.href = "/PatientDashboard.html#/patientHome";
                          });
            			 patientSuccess.error(function(data, status, headers, config) {
                             alert("failure message: " + data);
                         });
            		}else{
                        var patientSuccess = $http.get("https://doctors.cfapps.io/api/patient/get/"+ loginDetail.username +"/mobile");
                        patientSuccess.success(function (patientObj){
                            $cookieStore.put('loginData', patientObj);
                            $window.location.href = "/PatientDashboard.html#/patientHome";
                        });
                        patientSuccess.error(function(data, status, headers, config) {
                            alert("failure message: " + data);
                        });
                    }
            	}
            });
            loginSuccessful.error(function(data, status, headers, config) {
                alert("failure message: " + data.message);
                $scope.message = 'Invalid Credentials...!!!';
            });
        }
    } else {
    	  $cookieStore.remove("email");
          $cookieStore.remove("loginData");
        $window.location.href = "#/patientLogin";
        $scope.message = 'Invalid Credentials...try again';
    }
    // add validation for adhaar number
    $scope.doBlurAdhar = function($event) {
        var target = $event.target;
        if ($scope.doctor != null && $scope.doctor.aadhaarNumber != null &&
            $scope.doctor.aadhaarNumber.length == 12) {
            target.blur();
        } else {
            target.focus();
        }
    }
    //----------------------------- code for forgot password dialogue box timings 
    $(function() {
        $('#myModal1').on('show.bs.modal', function() {
            var myModal = $(this);
            clearTimeout(myModal.data('hideInterval'));
            myModal.data('hideInterval', setTimeout(function() {
                myModal.modal('hide');
            }, 4000));
        });
    });
    //------------------------------ code for forgot password dialogue box timings
    $scope.init = function(){           
        console.log("patient " +$scope.value);
    };
});

scotchApp.controller('patientdashboard',function($scope, $rootScope, $http, $cookieStore){
	var patientDetail = $cookieStore.get('patientData');
	
	if(patientDetail != null){
		var field = 6;
		if(patientDetail.homeAddress != null){
			field++;
		}
		$scope.percent = parseInt((field / 7)*100)+'%';
	}
});

function getByEmail($http, $cookieStore){
	
	alert($cookieStore.get('patientEmail'));
	var patients = $http.get('http://patient-service.cfapps.io/api/patient/getPatientByEmail/'+$cookieStore.get('patientEmail'));
	patients.success(function(data) {
		return data;
	});
	doctors.error(function(data, status, headers, config) {
	});
}
scotchApp.controller('patientsignup',function($scope, $http){
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
});
scotchApp.controller('patientupdateProfile',function($scope, $rootScope, $http, $cookieStore){
	$scope.patients = $cookieStore.get('patientData');
	$scope.patientUpdate = function(patientUpdateValue){
		console.log(patientUpdateValue);
		var updatepatient = $http.put('http://patient-service.cfapps.io/api/patient/', patientUpdateValue);
		updatepatient.success(function(updateResponse) {
			$scope.successMessage = "Successfully Updated...!!!";
			var patientSuccess = $http.get('http://patient-service.cfapps.io/api/patient/getPatientByEmail/'+patients.patientEmail);
			patientSuccess.success(function(data) {
				alert("dfdfdf");
				console.log(data.mobile);
				$cookieStore.remove('patientData');
				$cookieStore.put('patientData', data);
			});
			patientSuccess.error(function(data, status, headers, config) {
			});
		});
		updatepatient.error(function(updateResponse, status, headers, config) {
			alert("failure message: " + updateResponse.message);
		});
	}
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
});
scotchApp.controller('retrievePassword',function($scope, $rootScope){
	$scope.submit = function(){
        alert("Password send to your E-mail Id");
	}
});

scotchApp.controller('patientafterLogin',function($scope, $rootScope, $cookieStore){

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
});