angular.module('appModule').factory('techService', function($http) {
	var service = {};

	service.index = function() {
		return $http({
			method : 'GET',
			url : 'api/technologies'
		})
	};
	
	service.showTechTopics = function(techId) {
		return $http({
			method : 'GET',
			url : 'api/topics/' + techId,
		})
	};
	
	service.updateTech = function(updatedTech, techId){
		return $http({
		      method : 'PUT',
		      url : 'api/technologies/' + techId,
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : updatedTech
		    })
	};

	service.createTech = function(newTech) {
		return $http({
			method : 'POST',
			url : 'api/technologies',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : newTech
		})
	};
	
	service.destroyTech = function(techId) {
		return $http({
			method : 'DELETE',
			url : 'api/technologies/' + techId
		})
	};

	return service;
})