$(document).ready(function(){
	console.log("app js is working");

	var source;
	var template;
	var baseUrl = '/api/users/';
	var allUsers = [];
	var $userList;
	var $createUser = $('#create-user');
	var sourceUser;

	var userHtml;
	var userToOpen;
	var userId;


	$.get(baseUrl, function(element){
		source = $('#users-template').html();
		template = Handlebars.compile(source);
		$userList = $('#users-list');
		allUsers = element.users;
		userHtml = template({users: allUsers});
		$userList.append(userHtml);
	});

	$createUser.on('submit', function (event) {
    	event.preventDefault();
    	source = $('#users-template').html();
		template = Handlebars.compile(source);
		$userList = $('#users-list');
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

	$('#colds-list').on('click', '.cold', function (event) {
		event.preventDefault();
		var userUrl = window.location.href.split("/");
		var userId = userUrl[userUrl.length-1];
		coldId = $(this).attr('data-id');
		location.href = userId + "/colds/" + coldId;
	});

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

	// var url = window.location.href.split("/");
	// var id = url[url.length-1];
	// $.get(baseUrl + "/" + id, function(element){
	// 	sourceUser = $('#user-template').html();
	// 	template = Handlebars.compile(sourceUser);
	// 	var $userName = $('#user-Name');
	// 	var userNameHtml = template({user: element});
	// 	$userName.append(userNameHtml);
	// 	$('#cold-name').append(userNameHtml);

	// 	sourceCold = $('#colds-template').html();
	// 	template = Handlebars.compile(sourceCold);
	// 	var $coldslist = $('#colds-list');
	// 	var coldsHtml = template({user: element});
	// 	$coldslist.append(coldsHtml);
	// })

});