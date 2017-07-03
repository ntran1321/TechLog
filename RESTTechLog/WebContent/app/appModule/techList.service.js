angular.module('appModule')
	.factory('techService', function($http) {
		var service = {};
		
		service.index = function(){
			return $http({
				method : 'GET',
				url : 'api/technologies'
			})
		};
		
		return service;
})