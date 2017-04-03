scotchApp.controller('index', function ($scope, $http, $window, $cookieStore, $q, filterFilter, $mdDialog, popUpCalled) {

    $scope.dirty = {};
    /* $http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(states) {
     });*/
    $scope.btnClick = function () {
        popUpCalled.popup('Service Down for Maintainance', 'We will be back in a while');
        //        $window.location.href = '#/searchFunctionality';
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

    if ($cookieStore.get('email') != undefined) {
        $cookieStore.remove('email')
    }
    if ($cookieStore.get('loginData') != undefined) {
        $cookieStore.remove('loginData')
    }

    // for popup dilogue.... 
    popUpCalled.popup('Beta Version', 'Inconvenience regret...!!!');

});


scotchApp.controller('AppCtrl', function ($scope, $http, $window, $cookieStore, $q, filterFilter, ajaxGetResponse) {

    var foodArray = [];
    // Ajax hit via service AjaxGetServiceRequest
    var serverResponse = ajaxGetResponse.getAllExpertise();
    serverResponse.success(function (response) {
        foodArray = response;
    });
    serverResponse.error(function (data, status, headers, config) {
        alert('no response');
    });

    /*$http.get("https://doctors.cfapps.io/api/doctor/get/all/expertisation").success(function(expertise) {
        foodArray = expertise;
    });*/

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

        setTimeout(function () {
            if (query) {
                deferred.resolve(filterFilter(foodArray, query));
            } else {
                deferred.reject([{
                    country: 'None'
                }]);
            }
        }, 200);
        return deferred.promise;
    }
});

scotchApp.controller('indexSlider', function ($scope) {

});

scotchApp.controller('functionalitySearch', function ($scope, $http) {

    $scope.users = []; //declare an empty array
    $http.get("/html/SearchFunctionality/mockJson/mock.json").success(function (response) {
        $scope.users = response; //ajax request to fetch data into $scope.data
    });

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});

/*scotchApp.controller('middleContent', function ($scope, $cookieStore) {
    if ($cookieStore.get('loginData') != undefined &&
        $cookieStore.get('email') != undefined) {
        window.location = "#/dashboard";
    } else if ($cookieStore.get('patientData') != undefined &&
        $cookieStore.get('patientEmail') != undefined) {
        window.location = "#/patientdashboard";
    }
});*/

scotchApp.controller('doctorSearch', function ($scope, $http) {

});
/*scotchApp.controller('doctorSearch', function($scope, $http) {

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
});*/

scotchApp.controller('about', function ($scope) {
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

scotchApp.controller('contact', function ($scope, $http, ajaxGetResponse) {
    //Need to be add functionality in future

    $scope.submitDetail = function (details) {
        // Ajax hit via service AjaxGetServiceRequest
        var response = ajaxGetResponse.putContactInfo(details);
        response.success(function (data) {
            console.log('success');
            console.log(response);
        });
        response.error(function (data, status, headers, config) {
            console.log('failure');
        });
    }
});
