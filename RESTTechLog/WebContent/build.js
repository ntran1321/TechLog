var buildTechTable = function(techs){
	var table = $('<table>');
	var th1 = $('<th>');
	th1.text("Technology");
	var th2 = $('<th>');
	th2.text("Description");
	var th3 = $('<th>');
	th3.text("Comprehension");
	var th4 = $('<th>');
	th4.text("View");
	var th5 = $('<th>');
	th5.text("Delete");
	
	table.append(th1);
	table.append(th2);
	table.append(th3);
	table.append(th4);
	table.append(th5);
	
	techs.forEach(function(t,idx,array){
		var tr = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td>');
		var td4 = $('<td>');
		var td5 = $('<td>');

		td1.text(t.name);
		td1.attr('id', t.id);
		tr.append(td1);
		table.append(tr);
		
		td2.text(t.description);
		td2.attr('id', t.id);
		tr.append(td2);
		table.append(tr);
		
		td3.text(t.totalScore);
		td3.attr('id', t.id);
		tr.append(td3);
		table.append(tr);
		
		var viewBtn = $('<button>');
		viewBtn.text('VIEW');
		viewBtn.attr('id', 'view');
		viewBtn.attr('value', t.id);
		td4.append(viewBtn);
		tr.append(td4);
		table.append(tr);
		
		var deleteBtn = $('<button>');
		deleteBtn.text('DELETE');
		deleteBtn.attr('id', 'view');
		deleteBtn.attr('value', t.id);
		td5.append(deleteBtn);
		tr.append(td5);
		table.append(tr);
		
		viewBtn.click(function(e) {
			console.log("view button clicked");
			var techId = $(this).attr('value');
			loadSingleTechnology(techId);
			loadTechnologyTopics(techId);
		});
		
		deleteBtn.click(function(e) {
			console.log("delete button clicked");
			var techId = $(this).attr('value');
			deleteTechnology(techId);
		});
		
		$('#content').append(table);
	});
};

var displaySingleTechnology = function(tech){
	var header = $('<h2>');
	header.text(tech.name);
	var h3 = $('<h3>');
	h3.text(tech.topics);
	$('#content').append(header);
	$('#content').append(h3);
	
	var homeBtn = $('<button>');
	homeBtn.text('Home');
	$('#content').append(homeBtn);
	
	var addTopicBtn = $('<button>');
	addTopicBtn.text('Add Topic');
	$('#content').append(addTopicBtn);
	
	homeBtn.click(function(e) {
		load();
	});
	
	addTopicBtn.click(function(e) {
		console.log(tech.id);
		buildTopicForm(tech.id);
	});
};

var buildTopicsTable = function(topics){
	var table = $('<table>');
	var th1 = $('<th>');
	th1.text("Topic");
	var th2 = $('<th>');
	th2.text("Information");
	var th3 = $('<th>');
	th3.text("Comprehension");
	
	var th4 = $('<th>');
	th4.text("Delete");
	
	
	table.append(th1);
	table.append(th2);
	table.append(th3);
	table.append(th4);
	
	topics.forEach(function(t,idx,array){
		var tr = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td>');
		var td4 = $('<td>');

		td1.text(t.name);
		td1.attr('id', t.id);
		tr.append(td1);
		table.append(tr);
		
		td2.text(t.information);
		td2.attr('id', t.id);
		tr.append(td2);
		table.append(tr);
		
		td3.text(t.score);
		td3.attr('id', t.id);
		tr.append(td3);
		table.append(tr);
		
		var deleteTopicBtn = $('<button>');
		deleteTopicBtn.text('Delete');
		deleteTopicBtn.attr('value', t.id);
		td4.append(deleteTopicBtn);
		tr.append(td4);
		table.append(tr);
		
		deleteTopicBtn.click(function(e) {
			deleteTopic(t.id);
		});
	});

	$('#content').append(header);
	$('#content').append(table);
	
	var homeBtn = $('<button>');
	homeBtn.text('Home');
	$('#content').append(homeBtn);
	
	homeBtn.click(function(e) {
		load();
	});
};

var buildTechForm = function(){
	var form = $('<form id="createTech">');
	form.attr('name', 'createTechForm');

	var techName = $('<input>');
	techName.attr('name', 'name'); // assign a name attribute
	techName.attr('id', 'name'); // assign a name attribute
	techName.attr('type', 'text'); // assign a type attribute
	techName.attr('placeholder', 'Technology');
	form.append(techName);
	
	var description = $('<input>');
	description.attr('name', 'description'); // assign a name attribute
	description.attr('type', 'text'); // assign a type attribute
	description.attr('placeholder', 'Description');
	form.append(description);

	var $submit = $('<input>');
	$submit.attr('name', 'submit');
	$submit.attr('type', 'submit');
	$submit.attr('value', 'Log Technology');
	form.append($submit);

	$('#content').append(form);

	$submit.click(function(e) {
		e.preventDefault();
		$('#content').empty();
		var techObject = {};
		var formData = $(form).serializeArray();
		$.each(formData, function(i, field) {
			techObject[field.name] = field.value;
			techObject[field.name] = field.value;
		});
		createTechnology(techObject);
	});
};

var buildTopicForm = function(techId){
	var form = $('<form id="createTopic">');
	
	var topicName = $('<input>');
	topicName.attr('name', 'name'); // assign a name attribute
	topicName.attr('type', 'text'); // assign a type attribute
	topicName.attr('placeholder', 'Topic');
	form.append(topicName);
	
	var information = $('<input>');
	information.attr('name', 'information'); // assign a name attribute
	information.attr('type', 'text'); // assign a type attribute
	information.attr('placeholder', 'Information');
	form.append(information);
	
	var comprehension = $('<input>');
	comprehension.attr('name', 'score'); // assign a name attribute
	comprehension.attr('type', 'text'); // assign a type attribute
	comprehension.attr('placeholder', 'Comprehension');
	form.append(comprehension);
	
	var $submit = $('<input>');
	$submit.attr('name', 'submit');
	$submit.attr('type', 'submit');
	$submit.attr('value', 'Log Topic');
	form.append($submit);
	
	$('#content').append(form);
	
	$submit.click(function(e) {
		e.preventDefault();
		$('#content').empty();
		var topicObject = {};
		var formData = $(form).serializeArray();
		$.each(formData, function(i, field) {
			topicObject[field.name] = field.value;
			topicObject[field.name] = field.value;
			topicObject[field.name] = field.value;
		});
		createTopic(topicObject, techId);
	});
};






