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
	
	service.createTopic = function(newTopic, techId) {
		return $http({
			method : 'POST',
			url : 'api/topics/' + techId,
			headers : {
				'Content-Type' : 'application/json'
			},
			data : newTopic
		})
	};
	
	service.updateTopic = function(updatedTopic, topicId){
		return $http({
		      method : 'PUT',
		      url : 'api/topic/' + topicId,
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : updatedTech
		    })
	};
	
	service.destroyTopic = function(topicId) {
		return $http({
			method : 'DELETE',
			url : 'api/topics/' + topicId
		})
	};

	return service;
})

