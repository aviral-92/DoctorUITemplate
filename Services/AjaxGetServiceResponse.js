scotchApp.service('ajaxGetResponse', function ($http) {

    this.getAllExpertise = function () {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/doctor/get/all/expertisation');
        return serverResponse;
    }

    this.putContactInfo = function (contactDetail) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/misc/addContact', contactDetail);
        return serverResponse;
    }

    this.getPatientNotification = function (pId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/notification/getNotifyforpatient/' + pId + '/pId');
        return serverResponse;
    }

    //Common for both doctor and patient
    this.updateNotification = function (notify) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/notification/updateNotify', notify);
        return serverResponse;
    }

    this.getPatientMessage = function (pId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/message/getmessageforpatient/' + pId + '/pId');
        return serverResponse;
    }

    //Common for both doctor and patient
    this.updateMessage = function (message) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/message/updatemessage', message);
        return serverResponse;
    }

    this.getPatientTodoList = function (pId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/todo/gettodoListforpatient/' + pId + '/pId');
        return serverResponse;
    }

    this.addPatientTodoList = function (todoList) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/todo/addToDoListforpatient', todoList);
        return serverResponse;
    }

    this.updatePatientTodoList = function (todoList) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/todo/updatetodoListforPatient', todoList);
        return serverResponse;
    }

    this.updatePatientProfile = function (patient) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/patient/', patient);
        return serverResponse;
    }

    this.getDoctorNotification = function (dId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/notification/getNotifyfordoctor/' + dId + '/dId');
        return serverResponse;
    }

    this.getDoctorMessage = function (dId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/message/getmessagefordoctor/' + dId + '/dId');
        return serverResponse;
    }

    this.getAppointmentByDoctorId = function (dId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/appointment/appointment/' + dId + '/doctorBydId');
        return serverResponse;
    }

    this.getDoctorByEmail = function (email) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/doctor/get/' + email + '/email');
        return serverResponse;
    }

    this.updateDoctorProfile = function (doctor) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/doctor/', doctor);
        return serverResponse;
    }

    this.patientLogin = function (patient) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/login/patientlogin', patient);
        return serverResponse;
    }

    this.getPatientByEmail = function (email) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/patient/get/' + email + '/email');
        return serverResponse;
    }

    this.appointmentBookByPatient = function (appointment) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/appointment/appointment/make', appointment);
        return serverResponse;
    }

    this.sendNotoficationToDoctor = function (notification) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/notification/addNotifyfordoctor', notification);
        return serverResponse;
    }
    
    this.getDoctorTodoList = function (dId) {
        var serverResponse = $http.get('https://doctors.cfapps.io/api/todo/gettodoListfordoctor/' + dId + '/dId');
        return serverResponse;
    }

    this.addDoctorTodoList = function (todoList) {
        var serverResponse = $http.post('https://doctors.cfapps.io/api/todo/addToDoListfordoctor', todoList);
        return serverResponse;
    }

    this.updateDoctorTodoList = function (todoList) {
        var serverResponse = $http.put('https://doctors.cfapps.io/api/todo/updatetodoListfordoctor', todoList);
        return serverResponse;
    }

});
