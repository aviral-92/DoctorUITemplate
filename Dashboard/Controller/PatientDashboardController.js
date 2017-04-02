scotchApp.controller('index', function ($scope, $http, $cookieStore, $mdDialog, $window, $interval, popUpCalled, ajaxGetResponse) {

    var getPatients = $cookieStore.get('patientLoginData');
    $scope.name = getPatients.name;
    // need to add membership like created date.
    $scope.url = getPatients.src;
    console.log(getPatients);
    getNotification(getPatients);
    getMessages(getPatients);

    $scope.getNotofication = function (notify) {

        // Popup Called for alert...
        popUpCalled.popup(notify.notiyfMessage, notify.notiyfMessage);
        /* $mdDialog.show(
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
        console.log(notifys);
        var serverResponseUpdate = ajaxGetResponse.updateNotification(notifys);
        serverResponseUpdate.success(function (data) {
            console.log('success');
            getNotification(getPatients);
        });
        serverResponseUpdate.error(function (data, status, headers, config) {
            console.log('failure');
            getNotification(getPatients);
        });
    }

    $scope.getMessage = function (messages) {

        // Popup Called for alert...
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
            getMessages(getPatients);
        });
        serverResponseUpdate.error(function (data, status, headers, config) {
            console.log('failure');
            getMessages(getPatients);
        });
    }

    //Function for rest hit to get notofication array...
    function getNotification(patients) {
        var serverResponse = ajaxGetResponse.getPatientNotification(patients.pId);
        serverResponse.success(function (notification) {
            $scope.notificationCount = notification.length;
            console.log(notification);
            $scope.notifications = notification;
        });
        serverResponse.error(function (data, status, headers, config) {
            /*alert('Failure');*/
        });
        console.log('Notification function over');
    }

    function getMessages(patients) {
        var serverResponse = ajaxGetResponse.getPatientMessage(patients.pId);
        serverResponse.success(function (messages) {
            $scope.messageCount = messages.length;
            console.log(messages);
            $scope.messages = messages;
        });
        serverResponse.error(function (data, status, headers, config) {
            /*alert('Failure');*/
        });
        console.log('Message function over');
    }
});

scotchApp.controller('patientHome', function ($scope, $http, $cookieStore, $mdDialog, popUpCalled, ajaxGetResponse) {
    $scope.visible = false;
    var index = 0;
    $scope.url = "#/patientHome";
    console.log('data' + $cookieStore.get('patientLoginData').pId);
    var todoServerResponse = ajaxGetResponse.getPatientTodoList($cookieStore.get('patientLoginData').pId);
    todoServerResponse.success(function (todoData) {
        console.log(todoData);
        $scope.todoList = todoData;
        //alert("success");
    });
    todoServerResponse.error(function (todoData) {
        alert("failure");
    });


    $scope.updateTodo = function (todoData) {


        var updateJsonObj = {
            "todoId": todoData.todoId,
            "todoMessage": todoData.todoMessage
        }
        var updateJson = JSON.stringify(updateJsonObj);
        console.log(updateJson);

        var serverResponseupdate = ajaxGetResponse.updatePatientTodoList(updateJson);
        serverResponseupdate.success(function (response) {
            console.log(response);
            //Service called for popup
            popUpCalled.popup('update todo List', 'successfully updated...!!!');
            /*$mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title("update todo List")
                     .textContent("successfully updated...!!!")
                     .ariaLabel("successfully updated...!!!")
                     .ok('Ok!')
            );*/
        });
        serverResponseupdate.error(function (response) {
            alert("failure");
        });

    }
    $scope.addTodo = function () {

        var todoListObj = {
            'todoMessage': $scope.todoTastData,
            'pId': $cookieStore.get('patientLoginData').pId
        }
        var todoList = JSON.stringify(todoListObj);
        console.log(todoListObj);
        var serverResponse = ajaxGetResponse.addPatientTodoList(todoListObj);
        serverResponse.success(function (response) {
            $scope.todoList.push({
                "todoMessage": $scope.todoTastData
            });
            $scope.todoTastData = '';
        });
        serverResponse.error(function (response) {
            popUpCalled.popup('Under maintainance', 'Please try after sometime');
        });
    };

    scotchApp.controller('patientProfile', function ($scope, $cookieStore, fileReader, $http, $window, $interval, popUpCalled, ajaxGetResponse) {

        $scope.url = "#/patientProfile";
        var getPatients = $cookieStore.get('patientLoginData');

        $scope.patients = getPatients
        $scope.patients.dob = new Date($scope.patients.dob);

        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        };


        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.patients.src = result;
                    console.log($scope.file);
                });
        };

        $scope.patients = getPatients
        $scope.patientUpdate = function (patientUpdateValue) {
            console.log(patientUpdateValue);

            if ($cookieStore.get('patientLoginData').mobile == patientUpdateValue.mobile) {
                delete patientUpdateValue.mobile;
            }
            if (getPatients.email == patientUpdateValue.email) {
                delete patientUpdateValue.email;
            }
            if (getPatients.adhaar == patientUpdateValue.adhaar) {
                delete patientUpdateValue.adhaar;
            }
            var serverResponseUpdatePatient = ajaxGetResponse.updatePatientProfile(patientUpdateValue);
            serverResponseUpdatePatient.success(function (updateResponse) {
                //$scope.successMessage = "Successfully Updated...!!!";
                /*var patientSuccess = $http
                    .get('https://doctors.cfapps.io/api/patient/get/'+ $cookieStore.get('patientLoginData').email +'/email');*/
                /*patientSuccess.success(function(data) {
	                $cookieStore.remove('patientLoginData');
	                $cookieStore.put('patientLoginData', data);
                    
                    // Waiting for 5.5s so that it alert can show and it will load automatically after timeout...
                    $interval(callAtInterval,5500);
                   $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Paitent Updated')
                     .textContent('Patient updated successfully...!!!')
                     .ariaLabel('Patient updated successfully...!!!')
                     .ok('Ok!')
                     
               );
            
                    function callAtInterval() {
                        console.log("Interval occurred");
                        $window.location.reload();
                        console.log("Interval finished");
                    }
                    
	            });
	            patientSuccess.error(function(data, status, headers, config) {
                    
                });*/
                popUpCalled.popup('Paitent Updated', 'Patient updated successfully...!!!');
            });
            serverResponseUpdatePatient.error(function (updateResponse, status, headers, config) {
                popUpCalled.popup('Under Maintainance', 'Inconvinence regrected...!!!');
                /*  alert("failure message: " + updateResponse.message);*/
            });
        }

        //Calucate Age of Patient
        var age = new Date().getYear() - new Date($scope.patients.dob).getYear();
        $scope.patients.age = age;
        //Calculate percentage dynamically...
        if (getPatients != null) {
            var field = 5;
            if (getPatients.patientHomeAddress != null &&
                getPatients.patientHomeAddress != 'NA') {
                field++;
            }
            if (getPatients.dob != null &&
                getPatients.dob != 'NA') {
                field++;
            }
            if (getPatients.gender != null &&
                getPatients.gender != 'NA') {
                field++;
            }
            if (getPatients.age != null &&
                getPatients.age != 'NA') {
                field++;
            }
            if (getPatients.description != null &&
                getPatients.description != 'NA') {
                field++;
            }
            if (getPatients.allergies != null &&
                getPatients.allergies != 'NA') {
                field++;
            }
            $scope.percent = parseInt((field / 11) * 100) + '%';
        }
    });

    scotchApp.factory('alert', function ($uibModal) {

        function show(action, event) {
            return $uibModal.open({
                templateUrl: '../../Dashboard/calender/PatientModalContent.html',
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

    scotchApp.controller('KitchenSinkCtrl', function (moment, alert, calendarConfig) {

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
        vm.events = [{
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
            }];

        vm.cellIsOpen = true;

        vm.addEvent = function () {
            // Push will be used to push in array of events.
            //so we will save array in the last in db so that all the operations got over.
            vm.events.push({
                title: 'New event',
                startsAt: moment().startOf('day').toDate(),
                endsAt: moment().endOf('day').toDate(),
                color: calendarConfig.colorTypes.important,
                draggable: true,
                resizable: true
            });
        };

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

    });
});
