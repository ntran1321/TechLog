angular.module('appModule').component('techList',{
	templateUrl : 'app/appModule/techList/techList.component.html',
	controller : function(techService) {
		var vm = this;
		
		vm.techList = [];
		
		vm.tech = null;
		
		vm.techTopics = [];
		
		vm.updatedTech = null;
		
		var reload = function() {
			techService.index().then(function(response){
				console.log(response);
				vm.techList = response.data;
			});
		}
		reload();
		
		
		vm.loadTechTopics = function(techId) {
			techService.showTechTopics(techId).then(function(response){
				vm.techTopics = response.data;
			});
		}
		
		vm.updateTech = function(updatedTech, techId) {
			techService.updateTech(updatedTech, techId).then(function(response){
				reload();
			})
		}
		
		vm.createTech = function(newTech) {
			techService.createTech(angular.copy(newTech))
				.then(function(response){
					reload();
			})
		}
		
		vm.destroyTech = function(techId){
			techService.destroyTech(techId).then(function(response){
				reload();
			})
		}
		
	},
	controllerAs : 'vm'
});