angular.module('appModule').component(
		'techList',
		{
			templateUrl : 'app/appModule/techList/techList.component.html',
			controller : function(techService) {
				var vm = this;

				vm.techList = [];

				vm.tech = null;
				
				vm.currentTechId = null;

				vm.techTopics = [];

				vm.updatedTech = null;
				
				vm.updatedTopic = null;
				

				var reload = function() {
					techService.index().then(function(response) {
						console.log(response);
						vm.techList = response.data;
					});
				}
				reload();

				vm.loadTechTopics = function(techId) {
					vm.currentTechId = techId;
					console.log('current id'+vm.currentTechId);
					techService.showTechTopics(techId).then(function(response) {
						vm.techTopics = response.data;
					});
				}

				vm.updateTech = function(updatedTech, techId) {
					techService.updateTech(updatedTech, techId).then(
							function(response) {
								reload();
							})
				}

				vm.createTech = function(newTech) {
					techService.createTech(angular.copy(newTech)).then(
							function(response) {
								reload();
							})
				}

				vm.destroyTech = function(techId) {
					techService.destroyTech(techId).then(function(response) {
						reload();
					})
				}

				vm.updateTopic = function(updatedTopic, topicId) {
					techService.updateTopic(updatedTopic, topicId).then(
							function(response) {
								vm.loadTechTopics(vm.currentTechId);
							})
				}

				vm.createTopic = function(newTopic) {
					techService.createTopic(angular.copy(newTopic),vm.currentTechId).then(
							function(response) {
								vm.loadTechTopics(vm.currentTechId);
							})
				}

				vm.destroyTopic = function(topicId) {
					techService.destroyTopic(topicId).then(function(response) {
						vm.loadTechTopics(vm.currentTechId);
					})
				}

			},
			controllerAs : 'vm'
		});