'use strict';

angular.module('meshApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    var getObj = function() {
      $http.get('api/users/' + Auth.getCurrentUser()._id + '/things').success(function(data) {
        $scope.objectives = data.reverse();
      });
    }
    getObj();

    $scope.contacts = [
      {
        user: 'Irwin Litvak',
        online: true
      },
      {
        user: 'Jennifer Nelson',
        online: true
      },
      {
        user: 'Tyler Ball',
        online: false
      }
    ];

    $scope.invitees = [];

    $scope.removeInvitee = function(user) {
      var index = $scope.invitees.indexOf(user);
      $scope.invitees.splice(index, 1);
    }

    $scope.objAdd = false;

    $scope.toggleAdd = function() {
      $scope.objAdd = !$scope.objAdd
    }

    $scope.objectiveToAdd = '';
    $scope.objDescription = '';

    $scope.addErrors = {}

    $scope.addObjective = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.invalid = false;
        $http.post('api/things', {name: $scope.objectiveToAdd, info: $scope.objDescription, contributors: $scope.invitees.length + 1})
        .success(function(data) {
          $scope.objectives.unshift(data);
        });

        $scope.invitees = [];

        $scope.objectiveToAdd = '';
        $scope.objDescription = '';
      }
      if(form.$invalid) {
        $scope.invalid = true;
        $scope.addErrors.objective = 'An objective is required';
        $scope.addErrors.descript = 'A description is required'
      }
    }



    $scope.toggleEdit = function(index) {
      //obj.active = !obj.active
      $scope.indexEditing === index ? $scope.indexEditing = -1 : $scope.indexEditing = index;
    }

    $scope.editObjective = function(objective) {
      var id = objective._id;
      $http.put('api/things/' + id, objective).success(function() {
        $http.get('api/users/' + Auth.getCurrentUser()._id + '/things').success(function(data) {
          $scope.objectives = data.reverse();
          $scope.indexEditing = -1;
        });
      }).error(function(status) {
        console.log(status);
      });
    }

    $scope.deleteObjective = function(objective) {
      var id = objective._id;
      $http.delete('api/things/' + id).success(function() {
        $http.get('api/users/' + Auth.getCurrentUser()._id + '/things').success(function(data) {
          $scope.objectives = data.reverse();
        });
      }).error(function(status) {
        console.log(status);
      });
    }

  });
