var buildTechTable = function(techs) {
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
	var th6 = $('<th>');
	th6.text("Update");

	table.append(th1);
	table.append(th2);
	table.append(th3);
	table.append(th4);
	table.append(th5);
	table.append(th6);

	techs.forEach(function(t, idx, array) {
		var tr = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td align=center>');
		var td4 = $('<td>');
		var td5 = $('<td>');
		var td6 = $('<td>');

		td1.text(t.name);
		td1.attr('id', t.id);
		tr.append(td1);
		table.append(tr);

		td2.text(t.description);
		td2.attr('id', t.id);
		tr.append(td2);
		table.append(tr);

		td3.text(t.totalScore + "%");
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

		var updateBtn = $('<button>');
		updateBtn.text('UPDATE');
		updateBtn.attr('value', t.id);
		td6.append(updateBtn);
		tr.append(td6);
		table.append(tr);
		
		$('td').click(function(e){
			var techId = $(this).attr('id');
			loadSingleTechnology(techId);

			$('#content').empty();
		});

		viewBtn.click(function(e) {
			console.log("view button clicked");
			var techId = $(this).attr('value');
			loadSingleTechnology(techId);

			$('#content').empty();
		});

		deleteBtn.click(function(e) {
			console.log("delete button clicked");
			var techId = $(this).attr('value');
			deleteTechnology(techId);
			load();
		});

		updateBtn.click(function(e) {
			var techId = $(this).attr('value');
			$('#content').empty();
			$('#navHome').empty();
			$('#navHome').append('<a href="#goHome" id="goHome">Home</a>');
			$('#goHome').click(function(e){
				load();
			});
			buildUpdateTechForm(techId);
		});

		$('#content').append(table);
	});
};

var buildTopicsTable = function(topics) {
	$('#content').empty();
	var table = $('<table>');
	var th1 = $('<th>');
	th1.text("Topic");
	var th2 = $('<th>');
	th2.text("Information");
	var th3 = $('<th>');
	th3.text("Comprehension (0-4)");

	var th4 = $('<th>');
	th4.text("Delete");

	table.append(th1);
	table.append(th2);
	table.append(th3);
	table.append(th4);

	topics.forEach(function(t, idx, array) {
		var tr = $('<tr>');
		var td1 = $('<td>');
		var td2 = $('<td>');
		var td3 = $('<td align=center>');
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
			$('#content').empty();
		});

	});

	$('#content').append(table);
};

var buildTechForm = function() {
	var form = $('<br><form id="createTech">');
	form.attr('name', 'createTechForm');

	var techName = $('<input>');
	techName.attr('name', 'name'); // assign a name attribute
	techName.attr('id', 'name'); // assign a name attribute
	techName.attr('type', 'text'); // assign a type attribute
	techName.attr('placeholder', 'Technology');
	form.append(techName);

	var description = $('<textarea id="description rows="10" cols="50">');
	description.attr('name', 'description'); // assign a name attribute
	description.attr('type', 'text'); // assign a type attribute
	description.attr('placeholder', 'Description');
	form.append(description);

	var $submit = $('<br><input id="submitBtn">');
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

var buildTopicForm = function(techId) {
	var form = $('<form id="createTopic">');

	var topicName = $('<input>');
	topicName.attr('name', 'name'); // assign a name attribute
	topicName.attr('type', 'text'); // assign a type attribute
	topicName.attr('placeholder', 'Topic');
	form.append(topicName);

	var information = $('<textarea>');
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

var buildUpdateTechForm = function(techId) {
	var form = $('<form id="updateTech">');

	var techName = $('<input>');
	techName.attr('name', 'name'); // assign a name attribute
	techName.attr('id', 'name'); // assign a name attribute
	techName.attr('type', 'text'); // assign a type attribute
	techName.attr('placeholder', 'Technology');
	form.append(techName);

	var description = $('<textarea>');
	description.attr('name', 'description'); // assign a name attribute
	description.attr('type', 'text'); // assign a type attribute
	description.attr('placeholder', 'Description');
	form.append(description);

	var $submit = $('<input>');
	$submit.attr('name', 'submit');
	$submit.attr('type', 'submit');
	$submit.attr('value', 'Update Technology');
	form.append($submit);

	$('#content').append(form);

	$submit.click(function(e) {
		e.preventDefault();
		$('#content').empty();
		console.log("update tech submit form");
		var techObject = {};
		var formData = $(form).serializeArray();
		$.each(formData, function(i, field) {
			techObject[field.name] = field.value;
			techObject[field.name] = field.value;
		});
		console.log(techObject);
		updateTechnology(techObject, techId);
	});
};

var addHomeButton = function(){
	var homeBtn = $('<button>');
	homeBtn.text('Home');
	$('#content').append(homeBtn);

	homeBtn.click(function(e) {
		load();
		$('#navHome').empty();
		$('#header').empty();
		$('#content').empty();
	});
};


