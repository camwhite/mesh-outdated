'use strict';

angular.module('meshApp')
  .service('Http', function ($http, $q, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      return {
        getUsersThings: function() {
          var deferred = $q.defer();
          $http.get('api/users/' + Auth.getCurrentUser()._id + '/things')
          .success(deferred.resolve).error(deferred.reject);

          return deferred.promise
        },
        getAllThings: function() {
          var deferred = $q.defer();
          $http.get('api/things')
          .success(deferred.resolve).error(deferred.reject);

          return deferred.promise
        }
      }
    });