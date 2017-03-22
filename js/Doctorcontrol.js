scotchApp.controller('index', function($scope, $http, $window, $cookieStore, $q, filterFilter) {
    
    $scope.dirty = {};
    $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(states) {
        /*function suggest_state(term) {
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
        };*/
        
        
        //console.log($scope.dirty);
    });
    $scope.btnClick = function() {
        $window.location.href = '#/searchFunctionality';
        console.log($scope.dirty.value);

    }

    // initializing the time Interval
    $scope.firstSliderInterval = 30000;
    $scope.myInterval = 3000;
    $scope.aimInterval = 2500;

    // Initializing slide array
    $scope.slides = [{
        image: '/images/Slider 1/2.jpg',
        text: 'We have to connect every Indian to good medical facility. We are working for the people  not for money.'
    }, {
        image: '/images/Slider 2/2.jpg',
        text: 'We have to connect every Indian to good medical facility. We are working for the people  not for money.'
    }, {
        image: '/images/Slider 2/3.jpg',
        text: 'We have to connect every Indian to good medical facility. We are working for the people  not for money.'
    }, {
        image: '/images/Slider 2/4.jpg',
        text: 'We have to connect every Indian to good medical facility. We are working for the people  not for money.'
    }];

    var slides = $scope.slides;

    $scope.sliders = [{
        image: '/images/Slider 1/4.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 1/1.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/2.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 1/3.jpg',
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
    
    if($cookieStore.get('email') != undefined){
        $cookieStore.remove('email')
    }
    if($cookieStore.get('loginData') != undefined){
        $cookieStore.remove('loginData')
    }

});


scotchApp.controller('AppCtrl', function($scope, $http, $window, $cookieStore, $q, filterFilter) {
   
    var foodArray = [];
        $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(expertise) {

        var allExpertise = [];
        var i = 1, j = 0;
        while(expertise[i] != undefined){
            foodArray[j] = expertise[i];
            i++;
            j++;
        }
//        foodArray = allExpertise;
    });
    
     var vm = this;
    // The following are used in md-autocomplete
    vm.selectedItem = null;
    vm.searchText = null;
    vm.selectedFoods = [];
    vm.transformChip = transformChip;
    
    vm.querySearchDeferred = querySearchDeferred;
    
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
    }
    
    function querySearchDeferred(query) {
      var deferred = $q.defer();
      
      // Factory method would go below in actual example
      // The 200 millisecond delay mimics an ajax call
        
      setTimeout(function() {    
          
        // hard-coded search results
        /*var foodArray = [
          {name: 'Apples', category: 'Fruit'},
          {name: 'Bananas', category: 'Fruit'},
          {name: 'Salmon', category: 'Fish'},
          {name: 'Tilapia', category: 'Fish'},
          {name: 'Halibut', category: 'Fish'},
          {name: 'Striped Bass', category: 'Fish'},
          {name: 'Catfish', category: 'Fish'}
        ];*/
        if (query) {
          deferred.resolve(filterFilter(foodArray, query));
        } else {
          deferred.reject([{country: 'None'}]);
        }
      }, 200);
      return deferred.promise;
    }  
});

scotchApp.controller('indexSlider', function($scope) {

});

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
    
    $scope.doctorRegisteration = function(DocRegisteration){
    
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
						alert("User verification failed");
					}
				})
				.error(function(error){
				
				})
             }
        var drSignUp = $http.put('https://doctors.cfapps.io/api/doctor/signup',DocRegisteration);
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

    $http.get("/js/states.json").success(function(states) {
        function suggest_state(term) {
            var q = term.toLowerCase().trim();
            var results = [];
            // Find first 10 states that start with `term`.
            for (var i = 0; i < states.length && results.length < 10; i++) {
                var state = states[i].state;
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

    $scope.loader = false;
    $scope.searchDoctor = function(loginDetail) {
        var doctorSearch = null;
        if (loginDetail != null) {
            $scope.message = null;
            $scope.doctors = null;
            $scope.modalBody = false;

            console.log(loginDetail);
            doctorSearch = $http.post(
                'https://doctor-service.cfapps.io/api/doctor/get/all',
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

scotchApp.controller('about', function($scope) {
    // initializing the time Interval
    $scope.firstSliderInterval = 3000;
    // Initializing slide array
    var slides = $scope.slides;

    $scope.sliders = [{
        image: '/images/Slider 1/doc.jpg',
        text: 'Cute Fish'
    }, {
        image: '/images/Slider 1/doc4.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/sliderImage1.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/sliderImage2.jpg',
        text: 'Image3'
    }, {
        image: '/images/Slider 1/doc1.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/doc2.jpg',
        text: 'Image2'
    }, {
        image: '/images/Slider 1/sliderImage3.png',
        text: 'Image4'
    }];
});

scotchApp.controller('loginPage', function($scope, $rootScope, $http, $cookieStore, $window, $cookies, vcRecaptchaService) {

    var vm = this;
	vm.publicKey = "6Lf2kBgUAAAAACwYaEUzyTW3b_T3QEp2xcLcrG3B";
    
    
    //$scope.loader = false;
    if ($cookieStore.get('loginData') == undefined ||
        $cookies.email == undefined) {


        $scope.doctorLogin = function(loginDetail) {
            
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
				}).error(function(error){
				    alert("Captch invalid")
				})
                }
                
//            loginDetail.username = loginDetail.email;
            loginDetail.type = 'd';
            var loginSuccessful = $http
                .post("https://doctors.cfapps.io/api/login/drlogin", loginDetail);
           
            loginSuccessful.success(function(login) {
                
                if(login.message == 'success'){
                    if(loginDetail.username.includes('@')){
                        var doctorSuccess = $http.get("https://doctors.cfapps.io/api/doctor/get/"+ loginDetail.username +"/email");
                        doctorSuccess.success(function (doctorObj){
                            doctorObj.src = '/images/no_pic.png';
                            $cookieStore.put('loginData', doctorObj);
                            $window.location.href = "/DoctorDashboard.html#/home";
                        });
                        doctorSuccess.error(function(data, status, headers, config) {
                            alert("failure message: " + data);
                        });
                    }else{
                        var doctorSuccess = $http.get("https://doctors.cfapps.io/api/doctor/get/"+ loginDetail.username +"/mobile");
                        doctorSuccess.success(function (doctorObj){
                            $cookieStore.put('loginData', doctorObj);
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
        $window.location.href = "#/loginPage";// TODO, change URL, need to redirect on dashboard.
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
        console.log("doctor " + $scope.testInput);
       
        };
});




scotchApp.controller('contact', function($scope) {
	//Need to be add functionality in future
	$scope.submitDetail = function(details){
		
	}
	
});


/*scotchApp.controller('signUp', function($scope, $http) {
    $scope.doctorAdd = function(doctor, formName) {
        console.log(doctor);
        $scope.submit = true;
        console.log(formName);
        if ($scope[formName].$valid) {
            var res = $http.post('https://doctor-service.cfapps.io/api/doctor/',
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
});*/
/** **********************Dashboard Starts*********************** */

function getByEmail($http, $cookieStore) {
    alert($cookieStore.get('email'));
    var doctors = $http.get('https://doctor-service.cfapps.io/api/doctor/get/' +
        $cookieStore.get('email') + '/email');
    doctors.success(function(data) {
        return data;
    });
    doctors.error(function(data, status, headers, config) {});
}

/*scotchApp.controller('retrievePassword', function($scope, $rootScope) {
    $scope.submit = function() {
        alert("Password send to your E-mail Id");
    }
});
*/

/** **********************Dashboard Ends*********************** */