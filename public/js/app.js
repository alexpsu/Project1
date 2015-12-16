$(document).ready(function(){
	console.log("app js is working");

	var source;
	var template;
	var baseUrl = '/api/users/';
	var allUsers = [];
	var $userList = $('#users-list');
	var $createUser = $('#create-user');
	var sourceUser;

	var userHtml;
	var userToOpen;
	var userId;
	var logId;


	$.get(baseUrl, function(element){
		source = $('#users-template').html();
		template = Handlebars.compile(source);
		allUsers = element.users;
		userHtml = template({users: allUsers});
		$userList.append(userHtml);
	});

	$createUser.on('submit', function (event) {
    	event.preventDefault();
		source = $('#users-template').html();
		template = Handlebars.compile(source);
    	var newUser = $createUser.serialize();
    	$createUser[0].reset();
    	console.log("This is new user", newUser);
    	$.ajax({
    		method: 'POST',
    		url: baseUrl,
    		data: newUser,
    		success: function(taco) {
    			console.log("this is taco", taco);
    			$userList.empty();
    			allUsers.push(taco.user);
    			console.log("These are all users", allUsers);
    			userHtml = template({users: allUsers});
				$userList.append(userHtml);
      		}
    	});
	});

	$('#users-list').on('click', '.user', function (event) {
		event.preventDefault();
		userId = $(this).closest('.user').attr('data-id');
		userToOpen = allUsers.filter(function (user) {
			return user._id == userId;
			console.log(user);
		});
		location.href = "users/" + userId;
	});

	$('#new-cold').on('submit', function (event) {
    	event.preventDefault();
		var url = window.location.href.split("/");
		var id = url[url.length-1];
    	var newCold = $('#new-cold').serialize();
    	$('#new-cold')[0].reset();
    	console.log("This is new cold", newCold);
    	$.ajax({
    		method: 'POST',
    		url: baseUrl + id + "/colds",
    		data: newCold,
    		success: function(taco) {
    			console.log("this is taco", taco);
      		}
    	});
    	location.reload();
	});

	$('.select-cold').on('click', function (event) {
		event.preventDefault();
		var userUrl = window.location.href.split("/");
		var userId = userUrl[userUrl.length-1];
		var coldId = $(this).closest('.cold').attr('data-id');
		console.log(coldId);
		location.href = userId + "/colds/" + coldId;
	})

	$('#new-log').on('submit', function (event) {
    	event.preventDefault();
    	var url = window.location.href.split("/");
		var userId = url[4];
		var coldId = url[url.length-1];
    	var newLog = $('#new-log').serialize();
    	$('#new-log')[0].reset();
    	console.log("This is new log", newLog);
    	$.ajax({
    		method: 'POST',
    		url: baseUrl + userId + "/colds/" + coldId + "/logs",
    		data: newLog,
    		success: function(taco) {
    			console.log("this is taco", taco);
      		}
    	});
    	location.reload();
	});
	$('#colds-list').on('click', '.delete-cold', function (event) {
		event.preventDefault();
		var url = window.location.href.split("/");
		var userId = url[url.length-1];
		var coldId = $(this).closest('.cold').attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: baseUrl + userId + "/colds/" + coldId,
			success: function(element) {
				console.log(element);
			}
		});
		location.reload();
	});

	$('#colds-list').on('submit', '.update-cold', function (event) {
		event.preventDefault();
		var url = window.location.href.split("/");
		var userId = url[url.length-1];
		var coldId = $(this).closest('.cold').attr('data-id');
		var updatedCold = $(this).serialize();
		$('.update-cold')[0].reset();
		$.ajax({
			method: 'PUT',
			url: baseUrl + userId + "/colds/" + coldId,
			data: updatedCold,
			success: function(element) {
				console.log(element);
			}
		});
		location.reload();
	});

	$('#logs-list').on('click', '.delete-log', function (event) {
		event.preventDefault();
		var url = window.location.href.split("/");
		var userId = url[4];
		var coldId = url[url.length-1];
		var logId = $(this).closest('.log').attr('data-id');
		console.log(logId);
		$.ajax({
			method: 'DELETE',
			url: baseUrl + userId + "/colds/" + coldId + "/logs/" + logId,
			success: function(element) {
				console.log(element);
			}
		});
		location.reload();
	});

	$('#logs-list').on('submit', '.update-log', function (event) {
		event.preventDefault();
		var url = window.location.href.split("/");
		var userId = url[4];
		var coldId = url[url.length-1];
		var logId = $(this).closest('.log').attr('data-id');
		var updatedLog = $(this).serialize();
		$('.update-log')[0].reset();
		console.log(logId);
		$.ajax({
			method: 'PUT',
			url: baseUrl + userId + "/colds/" + coldId + "/logs/" + logId,
			data: updatedLog,
			success: function(element) {
				console.log(element);
			}
		});
		location.reload();
	});
});