'use strict';

/**
 * @ngdoc function
 * @name frontendMatriculaApp.controller:DetailsBlogCtrl
 * @description
 * # DetailsBlogCtrl
 * Controller of the frontendMatriculaApp
 */
var angular;
angular.module('BlogApp')
  .controller('DetailsBlogCtrl', function ($scope, $routeParams, $http) {
  	var urlBase = "http://localhost:8000/api/";
  	var urlBlog = "entradas/"
  	var jsonP = '/?callback=JSON_CALLBACK';
	  var idEntrada = $scope.id = $routeParams.id;

  	//funcion para cargar datos
    $scope.loadData = function() {
        $scope.responseClass = 'flaticon-loadBlog';
        
        $http.get(urlBase + urlBlog + idEntrada + jsonP, { cache: true})
        .success(function(data){
            $scope.entrada = data;
            $scope.responseClass = 'hide';
        })
        .error(function (data, status) {
          if (status === 401) {
            console.log('Las credenciales de autenticación no se proporcionaron.');
          }
        });
    };
    $scope.loadData();
  });