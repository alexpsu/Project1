$(document).ready(function(){
	console.log("app js is working");

	var source;
	var template;
	var baseUrl = '/api/users';
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

	$('#users-list').on('click', '.user', function (event) {
		userId = $(this).closest('.user').attr('data-id');
		userToOpen = allUsers.filter(function (user) {
			return user._id == userId;
		})
	});

	var url = window.location.href.split("/");
	var id = url[url.length-1];
	console.log(id);
	$.get(baseUrl + "/" + id, function(element){
		console.log("This is the ele", element);
		sourceUser = $('#user-template').html();
		template = Handlebars.compile(sourceUser);
		$userList = $('#user-list');
		userHtml = template({user: element});
		$userList.append(userHtml);
	})
});