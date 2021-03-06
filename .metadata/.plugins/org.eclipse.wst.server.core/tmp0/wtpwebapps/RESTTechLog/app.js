$(document).ready(function(){
	console.log("ready");
	load();
});

var load = function() {
	$('#navHome').empty();
	$.ajax({
		type : 'GET',
		url : 'api/technologies',
		dataType : 'JSON'
	})
	.done(function(data,status){
		console.log(data);
		$('#content').empty();
		showTechnologies(data);
		buildTechForm();
	})
	.fail(function(xhr,status,error){
		console.log("Load function is broken!");
		console.log(xhr.status);
	})
};

var showTechnologies = function(techs){
	buildTechTable(techs);
}

var loadSingleTechnology = function(id){
	$.ajax({
		type : 'GET',
		url : 'api/technologies/' + id,
		dataType : 'JSON'
	})
	.done(function(data,status){
		console.log(data);
		$('#content').empty();
		$('#header').text(data.name);
		
		loadTechnologyTopics(id);
		addHomeButton();
	})
	.fail(function(xhr,status,error){
		console.log("Load single tech is broken!");
		console.log(xhr.status);
	})
};

var createTechnology = function(newTech){
	$.ajax({
		type : 'POST',
		url : 'api/technologies',
		dataType : 'JSON',
		data : JSON.stringify(newTech),
		contentType : 'application/json'
	})
	.done(function(data,status){
		load(data);
	})
	.fail(function(xhr,status,error){
		console.log("Create tech is broken!");
		console.log(xhr.status);
	})
};

var loadTechnologyTopics = function(techId){
	buildTopicForm(techId);
	$.ajax({
		type : 'GET',
		url : 'api/topics/' + techId,
		dataType : 'JSON',
	})
	.done(function(data,status){
		if (data!==null){
			buildTopicsTable(data);
			addHomeButton();
		}
		else{
			$('#header').text("No Topics added!");
			addHomeButton();
		}
		buildTopicForm(techId);
	})
	.fail(function(xhr,status,error){
		console.log("Load topics is broken!");
		console.log(xhr.status);
	})
};

var updateTechnology = function(updatedTech, techId) {
	console.log(updatedTech);
	$.ajax({
		type : 'PUT',
		url : 'api/technologies/' + techId,
		dataType : 'JSON',
		contentType : 'application/json',
		data : JSON.stringify(updatedTech)
	}).done(function(data, status) {
		load(data);
	}).fail(function(xhr, status, error) {
		console.log("Everything is broken!")
		console.log(xhr.status);
	});
};

var deleteTechnology = function(techId){
	$.ajax({
		type: 'DELETE',
		url: 'api/technologies/' + techId,
	})
	.done(function(data,status){
		load(data);
	})
	.fail(function(xhr, status, error) {
	      console.log("Everything is broken inside delete function!")
	      console.log(xhr.status);
	    });
}

var createTopic = function(newObj, techId){
	$.ajax({
		type : 'POST',
		url : 'api/topics/' + techId,
		dataType : 'JSON',
		data : JSON.stringify(newObj),
		contentType : 'application/json'
	})
	.done(function(data,status){
		loadSingleTechnology(techId);
		loadTechnologyTopics(techId);
	})
	.fail(function(xhr,status,error){
		console.log("Create tech is broken!");
		console.log(xhr.status);
	})
};

var deleteTopic = function(topicId) {
	$.ajax({
		type: 'DELETE',
		url: 'api/topics/' + topicId,
	})
	.done(function(data,status){
		load(data);
	})
	.fail(function(xhr, status, error) {
	      console.log("Everything is broken inside delete function!")
	      console.log(xhr.status);
	    });
}

var updateTopic = function(updatedTopic, topicId) {
	$.ajax({
		type : 'PUT',
		url : 'api/topics/' + topicId,
		dataType : 'JSON',
		contentType : 'application/json',
		data : JSON.stringify(updatedTopic)
	}).done(function(data, status) {
		load(data);
	}).fail(function(xhr, status, error) {
		console.log("Everything is broken!")
		console.log(xhr.status);
	});
}


