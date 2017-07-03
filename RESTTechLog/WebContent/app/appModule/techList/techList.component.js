angular.module('appModule').component('techList',{
	templateUrl : 'app/appModule/techList/techList.component.html',
	controller : function(techService) {
		var vm = this;
		
		vm.techList = [];
		
		
		var reload = function() {
			techService.index().then(function(response){
				console.log(response);
				vm.techList = response.data;
			});
		}
		reload();
		
		
	},
	controllerAs : 'vm'
});