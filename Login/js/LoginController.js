/* Doctor Registeration */
scotchApp.controller('doctorRegistration', function($scope, $http, vcRecaptchaService) {

    $scope.confirm = false;
    $scope.signUpError = false;
    $scope.doBlurPassword = function(login) {

        if (login.password == login.cnfrmPassword) {
            $scope.confirm = false;
        } else {
            $scope.confirm = true;
        }
    }

    var vm = this;
    vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";

    $scope.doctorRegisteration = function(DocRegisteration) {

        if (vcRecaptchaService.getResponse() === "") { //if string is empty
            alert("Please resolve the captcha and submit!")
        } else {
            var post_data = { //prepare payload for request
                'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
            }
            console.log(post_data);
            /* Make Ajax request to our server with g-captcha-string */
            //Need to give our API to validate
            $http.post('http://code.ciphertrick.com/demo/phpapi/api/signup', post_data).success(function(response) {
                    if (response.error === 0) {
                        alert("Successfully verified and signed up the user");
                    } else {
                        alert("User verification failed");
                    }
                })
                .error(function(error) {

                })
        }
        var drSignUp = $http.put('https://doctors.cfapps.io/api/doctor/signup', DocRegisteration);
        drSignUp.success(function(doctors) {
            $scope.signUpError = true;
            $scope.register = 'Successfully signup, now you can Log-In it.';
        });
        drSignUp.error(function(data, status, headers, config) {
            alert("failure message: " + data.message);
            $scope.message = 'No Data Found!!!';
            $scope.signUpError = true;
            $scope.register = 'Try again later.';
        });
    }
});
/* Doctor Registeration */


/* Doctor Login */
scotchApp.controller('loginPage', function($scope, $rootScope, $http, $cookieStore, $window, $cookies, vcRecaptchaService) {

    var vm = this;
    vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";


    //$scope.loader = false;
    if ($cookieStore.get('doctorLoginData') == undefined) {


        $scope.doctorLogin = function(loginDetail) {

            if (vcRecaptchaService.getResponse() === "") { //if string is empty
                alert("Please resolve the captcha and submit!")
            } else {
                var post_data = { //prepare payload for request
                    'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
                }
                console.log(post_data);
                /* Make Ajax request to our server with g-captcha-string */
                //Need to give our API to validate
                $http.post('http://code.ciphertrick.com/demo/phpapi/api/signup', post_data).success(function(response) {
                    if (response.error === 0) {
                        alert("Successfully verified and signed up the user");
                    } else {
                        //alert("User verification failed");
                    }
                }).error(function(error) {
                    //alert("Captch invalid")
                })
            }

            //            loginDetail.username = loginDetail.email;
            loginDetail.type = 'd';
            var loginSuccessful = $http
                .post("https://doctors.cfapps.io/api/login/drlogin", loginDetail);

            loginSuccessful.success(function(login) {

                if (login.message == 'success') {
                    if (loginDetail.username.includes('@')) {
                        var doctorSuccess = $http.get("https://doctors.cfapps.io/api/doctor/get/" + loginDetail.username + "/email");
                        doctorSuccess.success(function(doctorObj) {
                            doctorObj.src = '/images/no_pic.png';
                            $cookieStore.put('doctorLoginData', doctorObj);
                            $window.location.href = "/DoctorDashboard.html#/home";
                        });
                        doctorSuccess.error(function(data, status, headers, config) {
                            alert("failure message: " + data);
                        });
                    } else {
                        var doctorSuccess = $http.get("https://doctors.cfapps.io/api/doctor/get/" + loginDetail.username + "/mobile");
                        doctorSuccess.success(function(doctorObj) {
                            $cookieStore.put('doctorLoginData', doctorObj);
                            $window.location.href = "/DoctorDashboard.html#/home";
                        });
                        doctorSuccess.error(function(data, status, headers, config) {
                            alert("failure message: " + data);
                        });
                    }
                }
                //$scope.loader = false;

            });
            loginSuccessful.error(function(data, status, headers, config) {
                alert("failure message: " + data);
                $scope.message = 'Invalid Credentials...!!!';
            });
        }

    } else {
        $cookieStore.remove("email");
        $cookieStore.remove("loginData");
        $window.location.href = "#/loginPage"; // TODO, change URL, need to redirect on dashboard.
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
    $scope.init = function() {
        console.log("doctor " + $scope.testInput);

    };
});
/* Doctor Login */


/* Patient Registeration */
scotchApp.controller('patientRegistrations', function($scope, $http, vcRecaptchaService) {
    $scope.confirm = false;
    $scope.signUpErrors = false;
    $scope.doBlurPassword = function(login) {

        if (login.password == login.cnfrmPassword) {
            $scope.confirm = false;
        } else {
            $scope.confirm = true;
        }
    }
    var vm = this;
    vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";

    $scope.patientRegisters = function(patientRegister) {

     /*   if (vcRecaptchaService.getResponse() === "") { //if string is empty
            alert("Please resolve the captcha and submit!")
        } else {*/
            var post_data = { //prepare payload for request
                'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
            }
            console.log(post_data);
            /* Make Ajax request to our server with g-captcha-string ***/
            //Need to give our API to validate
            $http.post('http://code.ciphertrick.com/demo/phpapi/api/signup', post_data).success(function(response) {
                    if (response.error === 0) {
                        alert("Successfully verified and signed up the user");
                    } else {
                        alert("User verification failed");
                    }
                })
                .error(function(error) {
                    //					alert("Captcha invalid")
                })
        /*}*/

        var patientSignUp = $http.put("https://doctors.cfapps.io/api/patient/signUp", patientRegister);

        patientSignUp.success(function(patients) {
            $scope.signUpErrors = true;
            $scope.register = 'Successfully signup, now you can Log-In it.';
        });
        patientSignUp.error(function(data, status, headers, config) {
            alert("failure message: " + data);
            $scope.message = 'No Data Found!!!';
            $scope.signUpErrors = true;
            $scope.register = 'Try again later.';
        });
    }

});
/* Patient Registeration */


/* Patient Login */
scotchApp.controller('patientLogin', function($scope, $rootScope, $http, $cookieStore,
    $window, $cookies, vcRecaptchaService) {
    var vm = this;
    vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";

    if ($cookieStore.get('patientLoginData') == undefined ||
        $cookies.email == undefined) {


        $scope.patientLogin = function(loginDetail) {
            /* console.log(loginDetail);
             $cookieStore.put('email', loginDetail.email);*/

           /* if (vcRecaptchaService.getResponse() === "") { //if string is empty
                alert("Please resolve the captcha and submit!")
            } else {*/
                var post_data = { //prepare payload for request
                    'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
                }
                console.log(post_data);
                /* Make Ajax request to our server with g-captcha-string */
                //Need to give our API to validate
                $http.post('http://code.ciphertrick.com/demo/phpapi/api/signup', post_data).success(function(response) {
                        if (response.error === 0) {
                            alert("Successfully verified and signed up the user");
                        } else {
                            //alert("User verification failed");
                        }
                    })
                    .error(function(error) {
                        alert("Captcha invalid")
                    })
            /*}*/

            loginDetail.type = 'p';
            var loginSuccessful = $http
                .post("https://doctors.cfapps.io/api/login/patientlogin", loginDetail);
            loginSuccessful.success(function(login) {

                if (login.message == "success") {
                    if (loginDetail.username.includes("@")) {
                        var patientSuccess = $http.get("https://doctors.cfapps.io/api/patient/get/" + loginDetail.username + "/email");
                        patientSuccess.success(function(patientObj) {
                            patientObj.src = '/images/no_pic.png';
                            $cookieStore.put('patientLoginData', patientObj);
                            $window.location.href = "/PatientDashboard.html#/patientHome";
                        });
                        patientSuccess.error(function(data, status, headers, config) {
                            alert("failure message: " + data);
                        });
                    } else {
                        var patientSuccess = $http.get("https://doctors.cfapps.io/api/patient/get/" + loginDetail.username + "/mobile");
                        patientSuccess.success(function(patientObj) {
                            $cookieStore.put('patientLoginData', patientObj);
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
    $scope.init = function() {
        console.log("patient " + $scope.value);
    };
});
/* Patient Login */