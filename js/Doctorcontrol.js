scotchApp.controller('index', function($scope, $http, $window) {

    $scope.dirty = {};
    $http.get("/js/countries.json").success(function(states) {
        function suggest_state(term) {
            var q = term.toLowerCase().trim();
            var results = [];
            // Find first 10 states that start with `term`.
            for (var i = 0; i < states.length && results.length < 10; i++) {
                var state = states[i].country;
                if (state.toLowerCase().indexOf(q) === 0)
                    results.push({
                        label: state,
                        value: state
                    });
            }
            return results;
        }

        function suggest_state_delimited(term) {
            var ix = term.lastIndexOf(','),
                lhs = term.substring(0, ix + 1),
                rhs = term.substring(ix + 1),
                suggestions = suggest_state(rhs);
            suggestions.forEach(function(s) {
                s.value = lhs + s.value;
            });

            return suggestions;
        };
        $scope.autocomplete_options = {
            suggest: suggest_state_delimited
        };
        console.log($scope.dirty);
    });
    $scope.btnClick = function() {
        $window.location.href = '#/searchFunctionality';
        console.log($scope.dirty.value);

    }

    // initializing the time Interval
    $scope.firstSliderInterval = 30000;
    $scope.myInterval = 3000;

    // Initializing slide array
    $scope.slides = [{
        image: '/images/Slider 2/1.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 2/2.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 2/3.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 2/4.jpg',
        text: 'Image4'
    }];

    var slides = $scope.slides;
    
    $scope.sliders = [{
        image: '/images/Slider 1/2.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 1/1.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/3.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 1/4.jpg',
        text: 'Image4'
    }];
    
    var sliders = $scope.sliders;
    
    $scope.slider3 = [{
        image: '/images/Slider 2/2.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 2/3.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 2/4.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 2/1.jpg',
        text: 'Image4'
    }];
    
    var slider3 = $scope.slider3;

});

scotchApp.controller('indexSlider', function($scope) {
	
});

scotchApp.controller('registration', function($scope) {
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
	        if ($scope.doctor != null && $scope.doctor.mobile != null &&
	            $scope.doctor.mobile.length == 10) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
	   
	   $scope.doBlurAdhar = function($event) {
	        var target = $event.target;
	        if ($scope.doctor != null && $scope.doctor.aadhaarNumber != null &&
	            $scope.doctor.aadhaarNumber.length == 12) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
});

scotchApp.controller('registrationUser', function($scope) {
	 $scope.doBlurName = function($event) {
	        var target = $event.target;
	        if ($scope.patient != null && $scope.patient.name.length > 0) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
	 
	   $scope.doBlurMobile = function($event) {
	        var target = $event.target;
	        if ($scope.patient != null && $scope.patient.mobile != null &&
	            $scope.patient.mobile.length == 10) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
	   
	   $scope.doBlurAdhar = function($event) {
	        var target = $event.target;
	        if ($scope.patient != null && $scope.patient.aadhaarNumber != null &&
	            $scope.patient.aadhaarNumber.length == 12) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
	   //TODO for Email Validation
	   $scope.doBlurEmail = function($event) {
	        var target = $event.target;
	        if ($scope.patient != null && $scope.patient.email != null &&
	            $scope.patient.email.length == 12) {
	            target.blur();
	        } else {
	            target.focus();
	        }
	    }
});

scotchApp.controller('functionalitySearch', function($scope, $http) {

    $scope.users = []; //declare an empty array
    $http.get("/html/SearchFunctionality/mockJson/mock.json").success(function(response) {
        $scope.users = response; //ajax request to fetch data into $scope.data
    });

    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});

scotchApp.controller('middleContent', function($scope, $cookieStore) {
    if ($cookieStore.get('loginData') != undefined &&
        $cookieStore.get('email') != undefined) {
        window.location = "#/dashboard";
    } else if ($cookieStore.get('patientData') != undefined &&
        $cookieStore.get('patientEmail') != undefined) {
        window.location = "#/patientdashboard";
    }
});

scotchApp.controller('doctorSearch', function($scope, $http) {
	
	$scope.dirty = {};
	 
	$http.get("/js/states.json").success(function(states){ 
		function suggest_state(term) {
		    var q = term.toLowerCase().trim();
		    var results = [];
		    // Find first 10 states that start with `term`.
		    for (var i = 0; i < states.length && results.length < 10; i++) {
		      var state = states[i].state;
		      if (state.toLowerCase().indexOf(q) === 0)
		        results.push({ label: state, value: state });
		    }
		    return results;
		  }
		  function suggest_state_delimited(term) {
		  var ix = term.lastIndexOf(','),
		      lhs = term.substring(0, ix + 1),
		      rhs = term.substring(ix + 1),
		      suggestions = suggest_state(rhs);
		  suggestions.forEach(function (s) {
		    s.value = lhs + s.value;
		  });

		  return suggestions;
		};
		  $scope.autocomplete_options = {
		    suggest: suggest_state_delimited
		  };
		  console.log($scope.dirty);
		});
	
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

/*scotchApp.controller('login', function($scope, $rootScope, $http, $cookieStore,
    $window) {

    $scope.loader = false;
    if ($cookieStore.get('loginData') == undefined ||
        $cookieStore.get('email') == undefined) {
        $scope.doctorLogin = function(loginDetail) {
            console.log(loginDetail);
            $cookieStore.put('email', loginDetail.email);
            var loginSuccessful = $http
                .get('https://doctor-service.cfapps.io/doctor/get/' +
                    loginDetail.email + '/email');
            document.getElementById("myNav").style.width = "100%";
            $scope.loader = true;
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
                $scope.loader = false;
            });
            loginSuccessful.error(function(data, status, headers, config) {
                alert("failure message: " + data.message);
                $scope.message = 'Invalid Credentials...!!!';
            });
        }
    } else {
        $window.location.href = "#/dashboard";
    }

});*/

scotchApp.controller('about', function($scope) {
	 // initializing the time Interval
    $scope.firstSliderInterval = 3000;
    // Initializing slide array
 var slides = $scope.slides;
    
    $scope.sliders = [{
        image: '/images/Slider 1/orthopaedic.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 1/sliderImage1.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/sliderImage2.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 1/sliderImage3.png',
        text: 'Image4'
    }];
});

scotchApp.controller('loginPage', function($scope, $rootScope, $http, $cookieStore,
    $window) {
    $scope.loader = false;
    if ($cookieStore.get('loginData') == undefined ||
        $cookieStore.get('email') == undefined) {


        $scope.doctorLogin = function(loginDetail) {
            console.log(loginDetail);
            $cookieStore.put('email', loginDetail.email);
            var loginSuccessful = $http
                .get('https://doctor-service.cfapps.io/doctor/get/' +
                    loginDetail.email + '/email');
            $scope.loader = true;
            console.log(">>>>>>>>>" + loginSuccessful.success);
            loginSuccessful.success(function(getDoctorDetails) {
                if (getDoctorDetails.doctorId != null) {
                    $scope.message = 'Successfully Logged in...!!!';
                    $rootScope.getDoctorByMobile = getDoctorDetails;
                    $cookieStore.put('loginData', getDoctorDetails);
                    $window.location.href = "/View/DoctorDashboard.html";
                } else {
                    $scope.message = 'Invalid Credentials...!!!';
                }
                $scope.loader = false;
            });
            loginSuccessful.error(function(data, status, headers, config) {
                alert("failure message: " + data.message);
                $scope.message = 'Invalid Credentials...!!!';
            });
        }
        $scope.showSelectValue = function(mySelect) {
            console.log(mySelect);
        }
    } else {
        $window.location.href = "#/loginPage";
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
});


scotchApp.controller('userLogin', function($scope, $rootScope, $http, $cookieStore,
	    $window) {
	    $scope.loader = false;
	    if ($cookieStore.get('loginData') == undefined ||
	        $cookieStore.get('email') == undefined) {


	        $scope.doctorLogin = function(loginDetail) {
	            console.log(loginDetail);
	            $cookieStore.put('email', loginDetail.email);
	            var loginSuccessful = $http
	                .get('https://doctor-service.cfapps.io/doctor/get/' +
	                    loginDetail.email + '/email');
	            $scope.loader = true;
	            console.log(">>>>>>>>>" + loginSuccessful.success);
	            loginSuccessful.success(function(getDoctorDetails) {
	                if (getDoctorDetails.doctorId != null) {
	                    $scope.message = 'Successfully Logged in...!!!';
	                    $rootScope.getDoctorByMobile = getDoctorDetails;
	                    $cookieStore.put('loginData', getDoctorDetails);
	                    $window.location.href = "/View/DoctorDashboard.html";
	                } else {
	                    $scope.message = 'Invalid Credentials...!!!';
	                }
	                $scope.loader = false;
	            });
	            loginSuccessful.error(function(data, status, headers, config) {
	                alert("failure message: " + data.message);
	                $scope.message = 'Invalid Credentials...!!!';
	            });
	        }
	        $scope.showSelectValue = function(mySelect) {
	            console.log(mySelect);
	        }
	    } else {
	        $window.location.href = "#/userLogin";
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
	});

scotchApp.controller('contact', function($scope) {});

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
        if ($scope.doctor != null && $scope.doctor.mobile != null &&
            $scope.doctor.mobile.length == 10) {
            target.blur();
        } else {
            target.focus();
        }
    }
    $scope.doBlurAdhar = function($event) {
        var target = $event.target;
        if ($scope.doctor != null && $scope.doctor.aadhaarNumber != null &&
            $scope.doctor.aadhaarNumber.length == 12) {
            target.blur();
        } else {
            target.focus();
        }
    }
});
/** **********************Dashboard Starts*********************** */

function getByEmail($http, $cookieStore) {
    alert($cookieStore.get('email'));
    var doctors = $http.get('https://doctor-service.cfapps.io/doctor/get/' +
        $cookieStore.get('email') + '/email');
    doctors.success(function(data) {
        return data;
    });
    doctors.error(function(data, status, headers, config) {});
}

scotchApp.controller('retrievePassword', function($scope, $rootScope) {
    $scope.submit = function() {
        alert("Password send to your E-mail Id");
    }
});


/** **********************Dashboard Ends*********************** */