scotchApp.controller('index', function ($scope, $http, $cookieStore, $mdDialog, $window, $interval, $rootScope, $window, ajaxGetResponse, popUpCalled) {

    if ($cookieStore.get('doctorLoginData') == undefined) {
        $window.location.href = '/index.html#/loginPage';
    } else {
        var getDoctors;
        if ($cookieStore.get('doctorLoginData') != undefined) {
            getDoctors = $cookieStore.get('doctorLoginData');
        } else {
            getDoctors = $cookieStore.get('patientLoginData');
        }
        $scope.name = getDoctors.name;
        $scope.url = getDoctors.src;
        $scope.nameWithExpertise = getDoctors.name + ' ' + getDoctors.expertized;
        $scope.membership = 'Member since 24 Feb 2017';
        getNotification(getDoctors);
        getMessages(getDoctors);

        $scope.getNotofication = function (notify) {

            popUpCalled.popup(notify.notiyfMessage, notify.notiyfMessage);
            /*$mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#dialogContainer')))
                .clickOutsideToClose(true)
                .title(notify.notiyfMessage)
                .textContent(notify.notiyfMessage)
                .ariaLabel(notify.notiyfMessage)
                .ok('Ok!')
            );*/
            var obj = {
                "notifyId": notify.notifyId
            }; // Create new object
            var notifys = JSON.stringify(obj)
            /* console.log(notifys);*/
            var serverResponseUpdate = ajaxGetResponse.updateNotification(notifys);
            serverResponseUpdate.success(function (data) {
                console.log('success');
                getNotification(getDoctors);
            });
            console.log('failure');
            getNotification(getDoctors);
        }

        $scope.getMessage = function (messages) {

            popUpCalled.popup(messages.message, messages.message);
            /*$mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#dialogContainer')))
                .clickOutsideToClose(true)
                .title(messages.message)
                .textContent(messages.message)
                .ariaLabel(messages.message)
                .ok('Ok!')
            );*/

            var serverResponseUpdate = ajaxGetResponse.updateMessage(messages);
            serverResponseUpdate.success(function (data) {
                console.log('success');
                getMessages(getDoctors);
            });
            serverResponseUpdate.error(function (data, status, headers, config) {
                console.log('failure');
                getMessages(getDoctors);
            });
        }

        function getNotification(doctors) {
            var serverResponse = ajaxGetResponse.getDoctorNotification(doctors.doctorId);
            serverResponse.success(function (notification) {
                $scope.notificationCount = notification.length;
                console.log(notification);
                $scope.notifications = notification;
            });
            serverResponse.error(function (data, status, headers, config) {
                /*   alert('Failure');*/
                popUpCalled.popup('Under Maintainence', 'inconvinence regrected...!!!');
            });
            console.log('Notification function over');
        }

        function getMessages(doctors) {
            var serverResponse = ajaxGetResponse.getDoctorMessage(doctors.doctorId);
            serverResponse.success(function (messages) {
                $scope.messageCount = messages.length;
                console.log(messages);
                $scope.messages = messages;
            });
            serverResponse.error(function (data, status, headers, config) {
                /*  alert('Failure');*/
                popUpCalled.popup('Under Maintainence', 'inconvinence regrected...!!!');
            });
            console.log('Message function over');
        }

        $scope.btnClick = function () {

            var serverResponse = ajaxGetResponse.getAppointmentByDoctorId(getDoctors.doctorId);
            $scope.spinner = true;
            serverResponse.success(function (doctorsList) {
                $scope.spinner = false;
                console.log(doctorsList);
                $rootScope.getDoctorAppointment = doctorsList;
                // Routing to appointment page....
                $window.location.href = '#/doctorAppointment';
                //                $scope.doctors = doctorsList;
            });
            serverResponse.error(function (data, status, headers, config) {
                //            alert('Failure'); 
                $scope.spinner = false;
                popUpCalled.popup('Service Down for Maintainance', 'We will be back in a while');
            });
        }
    }
});

scotchApp.controller('home', function ($scope, $http, $cookieStore, $window) {

    if ($cookieStore.get('doctorLoginData') == undefined) {
        $window.location.href = '/index.html#/loginPage';
    }
    $scope.visible = false;
    var index = 0;
    $scope.url = "#/home";
    var todo = $http.get('/js/MockJson/todoList.json');
    todo.success(function (todoData) {
        $scope.todoList = todoData;
    });

    $scope.close = function () {
        var data = $scope.todoTastData;
        $scope.todoList.push({
            "message": data
        });
        $scope.todoTastData = '';
    }

});

scotchApp.controller('calender', function ($scope, $cookieStore) {

    var getDoctors = $cookieStore.get('doctorLoginData');
    $scope.name = getDoctors.name;
    $scope.src = getDoctors.src;
    $scope.nameWithExpertise = getDoctors.name + ' ' + getDoctors.expertized;
    $scope.membership = 'Member since 24 Feb 2017';
});


scotchApp.factory('alert', function ($uibModal) {

    function show(action, event) {
        return $uibModal.open({
            templateUrl: '../../Dashboard/calender/modalContent.html',
            controller: function () {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    return {
        show: show
    };
});

scotchApp.controller('KitchenSinkCtrl', function (moment, alert, calendarConfig, $scope) {

    var vm = this;
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
        label: '',
        onClick: function (args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '',
        onClick: function (args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];
    vm.events = [
        /*{
          title: 'An event ',
          color: calendarConfig.colorTypes.warning,
          startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
          endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
          draggable: true,
          resizable: true,
          actions: actions
        }, {
          title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
          color: calendarConfig.colorTypes.info,
          startsAt: moment().subtract(1, 'day').toDate(),
          endsAt: moment().add(5, 'days').toDate(),
          draggable: true,
          resizable: true,
          actions: actions
        }, {
          title: 'This is a really long event title that occurs on every year',
          color: calendarConfig.colorTypes.important,
          startsAt: moment().startOf('day').add(7, 'hours').toDate(),
          endsAt: moment().startOf('day').add(19, 'hours').toDate(),
          recursOn: 'year',
          draggable: true,
          resizable: true,
          actions: actions
        }*/
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function () {
        // Push will be used to push in array of events.
        //so we will save array in the last in db so that all the operations got over.
        vm.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            //color: calendarConfig.colorTypes.important,
            //draggable: true,
            //resizable: true
        });
    };

    //TODO Ajax hit to Save or Update an event.
    vm.save = function (index) {

        console.log(vm.events[index]);
        console.log($scope.hours);
    }

    //TODO Ajax hit to delete an event.
    vm.delete = function (index) {

        vm.events.splice(index, 1);
    }

    vm.eventClicked = function (event) {
        alert.show('Clicked', event);
    };

    vm.eventEdited = function (event) {
        alert.show('Edited', event);
    };

    vm.eventDeleted = function (event) {
        alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function (event) {
        alert.show('Dropped or resized', event);
    };

    vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    vm.timespanClicked = function (date, cell) {

        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }

    };
    console.log(vm.events);

});

/* ----Profile--- */
scotchApp.controller('profile', function ($scope, $cookieStore, fileReader, $http, $window, $interval, popUpCalled, ajaxGetResponse) {
    $scope.url = "#/profile";
    var getDoctors = $cookieStore.get('doctorLoginData');
    $scope.doctors = getDoctors
    $scope.doctors.dob = new Date($scope.doctors.dob);
    $scope.uploadPicture = function () {
        var fileInput = document.getElementById('uploadFile');
        fileInput.click();
    };
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.doctors.src = result;
                console.log($scope.file);
            });
    };
    $scope.doctorUpdate = function (doctorUpdateValue) {
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

        //TODO need to change cookies from loginData to doctorLoginData.
        var serverResponseUpdateDoctor = ajaxGetResponse.updateDoctorProfile(doctorUpdateValue);
        serverResponseUpdateDoctor.success(function (updateResponse) {
            $scope.successMessage = "Successfully Updated...!!!";

            //No need to get again as while updating fields will already have data.

            // setDoctorsOnHtml($cookieStore.get('doctorLoginData'));
            popUpCalled.popup('Doctor Updated', 'Doctor updated successfully...!!!');
            /*$mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#dialogContainer')))
                .clickOutsideToClose(true)
                .title('Doctor Updated')
                .textContent('Doctor updated successfully...!!!')
                .ariaLabel('Doctor updated successfully...!!!')
                .ok('Ok!')

            );*/
        });
        serverResponseUpdateDoctor.error(function (updateResponse, status, headers, config) {
            //            alert("failure message: " + updateResponse.message);
        });
    }

    /*function setDoctorsOnHtml(doctorData) {
        var serverResponseSuccess = ajaxGetResponse.getDoctorByEmail(doctorData.email);
        serverResponseSuccess.success(function (data) {
            $cookieStore.remove('doctorLoginData');
            $cookieStore.put('doctorLoginData', data);
            $scope.doctors = data;
        });
        serverResponseSuccess.error(function (data, status, headers, config) {
              alert('ggg');
        });
    }*/

    //Calucate Age of Doctor
    var age = new Date().getYear() - new Date($scope.doctors.dob).getYear();
    $scope.doctors.age = age;

    //Calculate percentage dynamically...
    if (getDoctors != null) {
        var field = 5;
        if (getDoctors.homeAddress != null &&
            getDoctors.homeAddress != 'NA') {
            field++;
        }
        if (getDoctors.highestDegree != null &&
            getDoctors.highestDegree != 'NA') {
            field++;
        }
        if (getDoctors.expertized != null &&
            getDoctors.expertized != 'NA') {
            field++;
        }
        if (getDoctors.isGovernmentServent != null &&
            getDoctors.isGovernmentServent != 'NA') {
            field++;
        }
        if (getDoctors.clinicAddress != null &&
            getDoctors.clinicAddress != 'NA') {
            field++;
        }
        if (getDoctors.oneTimeFee != null &&
            getDoctors.oneTimeFee != '' &&
            getDoctors.oneTimeFee != 'NA') {
            field++;
        }
        if (getDoctors.daysCheckFree != null &&
            getDoctors.daysCheckFree != 'NA') {
            field++;
        }
        if (getDoctors.clinicName != null &&
            getDoctors.clinicName != 'NA') {
            field++;
        }
        if (getDoctors.dob != null &&
            getDoctors.dob != 'NA') {
            field++;
        }
        if (getDoctors.gender != null &&
            getDoctors.gender != 'NA') {
            field++;
        }
        if (getDoctors.age != null &&
            getDoctors.age != 'NA') {
            field++;
        }
        if (getDoctors.description != null &&
            getDoctors.description != 'NA') {
            field++;
        }
        $scope.percent = parseInt((field / 17) * 100) + '%';
    }
});

/*scotchApp.controller('dateController', dateController);
 function dateController ($scope) {
            $scope.myDate = new Date();
            $scope.minDate = new Date(
               $scope.myDate.getFullYear(),
               $scope.myDate.getMonth() - 2,
               $scope.myDate.getDate());
            $scope.maxDate = new Date(
               $scope.myDate.getFullYear(),
               $scope.myDate.getMonth() + 2,
               $scope.myDate.getDate());
            $scope.onlyWeekendsPredicate = function(date) {
               var day = date.getDay();
               return day === 0 || day === 6;
            }
         }  */

scotchApp.controller('signout', function ($scope, $cookieStore, $window) {

    //$cookieStore.remove('email') ;
    if ($cookieStore.get('doctorLoginData') != undefined) {
        $cookieStore.remove('doctorLoginData');
    } else {
        $cookieStore.remove('patientLoginData');
    }
    $window.location.href = '/index.html#/loginPage';
});
