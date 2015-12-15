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

	var url = window.location.href.split("/");
	var id = url[url.length-1];
	$('#new-cold').on('submit', function (event) {
    	event.preventDefault();
    	console.log("Lets try this", userToOpen);
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

	var userUrl = window.location.href.split("/");
	var userId = userUrl[url.length-1];
	$('#colds-list').on('click', '.cold', function (event) {
		event.preventDefault();
		coldId = $(this).attr('data-id');
		location.href = userId + "/colds/" + coldId;
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