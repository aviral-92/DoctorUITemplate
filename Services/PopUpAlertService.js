scotchApp.service('popUpCalled', function ($mdDialog) {

    this.popup = function (title, msg) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#dialogContainer')))
            .clickOutsideToClose(true)
            .title(title)
            .textContent(msg)
            .ariaLabel(msg)
            .ok('Ok!')
        );
    }
});
