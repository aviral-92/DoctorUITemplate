scotchApp.directive('inlineEdit', function($timeout) {
  return {
    scope: {
      model: '=inlineEdit',
      handleSave: '&onSave',
    },
    link: function(scope, elm, attr) {
      var previousValue;
      
      scope.edit = function() {
        scope.editMode = true;
        previousValue = scope.model;
        
        $timeout(function() {
          elm.find('input')[0].focus();
        }, 0, false);
      };
      scope.save = function() {
        scope.editMode = false;
        scope.handleSave({value: scope.model});
      };
      scope.cancel = function() {
        scope.editMode = false;
        scope.model = previousValue;
        //scope.handleCancel({value: scope.model});
      };
    },
    templateUrl: '../Dashboard/pages/inline-edit.html'
  };
});

// On esc event
scotchApp.directive('onEsc', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.onEsc);
      }
    });
  };
});

// On enter event
scotchApp.directive('onEnter', function() {
  return function(scope, elm, attr) {
    elm.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.onEnter);
      }
    });
  };
});

//for profile piture
scotchApp.directive("ngFile",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    }
  }
});

scotchApp.factory("fileReader", ["$q", "$log", function($q, $log){
  var factory = {};
  factory.readAsDataUrl = function (file, scope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);         
      reader.readAsDataURL(file);
      return deferred.promise;
  };
  
  var onLoad = function(reader, deferred, scope) {
      return function () {
          scope.$apply(function () {
              deferred.resolve(reader.result);
          });
      };
  };

  var onError = function (reader, deferred, scope) {
      return function () {
          scope.$apply(function () {
              deferred.reject(reader.result);
          });
      };
  };

  var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      return reader;
  };

  return factory;                   
}]);